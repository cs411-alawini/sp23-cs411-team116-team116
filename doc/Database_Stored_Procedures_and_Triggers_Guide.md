### Tables Schemas:

Victims(DR_NO, Vict_Age, Vict_Sex, Weapon_Used_Cd, Crm_Cd, AREA, LAT, LON)  
Weapons(Weapon_Used_Cd, Weapon_Desc)  
Crime_Types(Crm_Cd, Crm_Cd_Desc)  
Areas(AREA, Area_Name)  
User(User_Id, Hashed_Password)  
Query(Query_ID, User, LAT, LON, Radius, Most_Common_Weapon_Type, Most_Common_Crime_Type, Crime_Count, Crime_Level)  

## Stored Procedure:

```MySQL
CREATE DEFINER=`root`@`%` PROCEDURE `GetCrimeInfo`(IN p_user_id VARCHAR(45), IN p_latitude FLOAT, IN p_longitude FLOAT, IN p_radius FLOAT, OUT p_query_id INT)
BEGIN
	DECLARE v_DR_NO INT;
	DECLARE v_Vict_Age INT;
	DECLARE v_Vict_Sex VARCHAR(45);
	DECLARE v_Weapon_Used_Cd INT;
	DECLARE v_Crm_Cd INT;
	DECLARE v_AREA INT;
	DECLARE v_LAT FLOAT;
	DECLARE v_LON FLOAT;
	DECLARE v_distance FLOAT;
	DECLARE done INT DEFAULT FALSE;
	DECLARE cur CURSOR FOR SELECT * FROM Victims;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	-- Step 1: Generate the query id.
	SET p_query_id = (SELECT COALESCE(MAX(Query_ID), 0) + 1 FROM Query);

	-- Step 2: Create a temporary table to store the crimes within the radius using a cursor and loop.
	DROP TEMPORARY TABLE IF EXISTS NearbyCrimes;
	CREATE TEMPORARY TABLE NearbyCrimes (
	DR_NO INT,
	Vict_Age INT,
	Vict_Sex VARCHAR(45),
	Weapon_Used_Cd INT,
	Crm_Cd INT,
	AREA INT,
	LAT FLOAT,
	LON FLOAT,
	distance FLOAT
	);


	OPEN cur;

	crime_loop: LOOP
	FETCH cur INTO v_DR_NO, v_Vict_Age, v_Vict_Sex, v_Weapon_Used_Cd, v_Crm_Cd, v_AREA, v_LAT, v_LON;
	IF done THEN
	  LEAVE crime_loop;
	END IF;

	SET v_distance = 6371000 * ACOS(
	  COS(RADIANS(p_latitude)) * COS(RADIANS(v_LAT)) *
	  COS(RADIANS(v_LON) - RADIANS(p_longitude)) +
	  SIN(RADIANS(p_latitude)) * SIN(RADIANS(v_LAT))
	);

	IF v_distance <= p_radius THEN
	  INSERT INTO NearbyCrimes (DR_NO, Vict_Age, Vict_Sex, Weapon_Used_Cd, Crm_Cd, AREA, LAT, LON, distance)
	  VALUES (v_DR_NO, v_Vict_Age, v_Vict_Sex, v_Weapon_Used_Cd, v_Crm_Cd, v_AREA, v_LAT, v_LON, v_distance);
	END IF;
	END LOOP;

	CLOSE cur;

	-- Step 3: Get the 3 most common weapon types.
	SELECT GROUP_CONCAT(Weapon_Desc SEPARATOR ';') INTO @top3_weapons
	FROM (
	SELECT Weapon_Desc
	FROM NearbyCrimes
	JOIN Weapons ON NearbyCrimes.Weapon_Used_Cd = Weapons.Weapon_Used_Cd
	GROUP BY Weapons.Weapon_Used_Cd
	ORDER BY COUNT(*) DESC
	LIMIT 3
	) AS TopWeapons;

	-- Step 4: Get the 3 most common crime types.
	SELECT GROUP_CONCAT(Crm_Cd_Desc SEPARATOR ';') INTO @top3_crime_types
	FROM (
	SELECT Crm_Cd_Desc
	FROM NearbyCrimes
	JOIN Crime_Types ON NearbyCrimes.Crm_Cd = Crime_Types.Crm_Cd
	GROUP BY Crime_Types.Crm_Cd
	ORDER BY COUNT(*) DESC
	LIMIT 3
	) AS TopCrimeTypes;

	-- Step 5: Calculate the total crime count.
	SELECT COUNT(*) INTO @crime_count
	FROM NearbyCrimes;

	-- Step 6: Determine the crime level based on the crime density.

	IF @crime_count <= 100 THEN
	  SET @crime_level = 'GREEN';
	ELSEIF @crime_count <= 1000 THEN
	  SET @crime_level = 'YELLOW';
	ELSE
	  SET @crime_level = 'RED';
	END IF;

	-- Step 7: Insert the result into the Query table.
	INSERT INTO `Query` (Query_ID, `Query`.`User`, LAT, LON, Radius, Most_Common_Weapon_Type, Most_Common_Crime_Type, Crime_Count, Crime_Level)
	VALUES (p_query_id, p_user_id, p_latitude, p_longitude, p_radius, @top3_weapons, @top3_crime_types, @crime_count, @crime_level);

END
```

## Trigger:
```MySQL
CREATE DEFINER=`root`@`%` TRIGGER `User_AFTER_DELETE` AFTER DELETE ON `User` FOR EACH ROW BEGIN
	DELETE FROM `Query` WHERE `Query`.User = OLD.User_Id;
END
```
