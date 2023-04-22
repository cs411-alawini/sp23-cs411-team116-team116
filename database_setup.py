import mysql.connector
from mysql.connector import Error
import requests
import zipfile
import io
import pandas as pd

def df_to_tuples(df, default_values):
    df = df.fillna(value=default_values)
    df = df.replace({'': None})

    return list(set([tuple(row) for row in df.itertuples(index=False)]))

def data_processing():
    df = pd.read_csv('CrimeData.csv', header=0)
    # print(df)
    Victim_Schema = ['DR_NO', 'Vict Age', 'Vict Sex', 'Weapon Used Cd', 'AREA', 'LAT', 'LON']
    Victim_df = df[Victim_Schema]
    print(Victim_df[:5])

    Weapon_Schema = ['Weapon Used Cd', 'Weapon Desc']
    Weapon_df = df[Weapon_Schema]
    Weapon_df = Weapon_df.drop_duplicates()
    print(Weapon_df[:5])

    Areas_Schema = ['AREA', 'AREA NAME']
    Areas_df = df[Areas_Schema]
    Areas_df = Areas_df.drop_duplicates()
    print(Areas_df[:5])

    return Victim_df, Weapon_df, Areas_df

def db(Victim_df, Weapon_df, Areas_df):
    # Configure the connection parameters
    config = {
        'host':'34.27.148.60',
        'user': 'root',
        'password':'1234',
        'database':'CS411CrimeData',
    }
    # Establish the connection using try-except block to catch errors
    try:
        connection = mysql.connector.connect(**config)
    except Error as err:
        print(f"Connection Error: {err}")
        connection = None
    # Create a cursor object
    cursor = connection.cursor(buffered=True)




    def Victims_Table_Create():
        # Victims
        # Insert data into the table
        delete_query = "DELETE FROM `Victims`"
        cursor.execute(delete_query)


        insert_data_query = """
        INSERT INTO `Victims` (`DR_NO`, `Vict_Age`, `Vict_Sex`, `Weapon_Used_Cd`, `AREA`, `LAT`, `LON`)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        # Using try-except block to catch errors
        # print(Victim_df[0])
        try:
            
            # cursor.execute(insert_data_query, Victim_df[0])
            cursor.executemany(insert_data_query, Victim_df)
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

    
        fetch_data_query = """
        SELECT * 
        FROM `Victims`
        """

        # Using try-except block to catch errors
        try:
            
            cursor.execute(fetch_data_query)
            # cursor.executemany(insert_data_query, Victim_df)
            result = cursor.fetchall()
            for row in result[:5]:
                print("Data in Victims: ",row)
            print("Data Len in Victims: ", len(result))
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

    def Areas_Table_Create():
        # Victims
        # Insert data into the table
        delete_query = "DELETE FROM `Areas`"
        cursor.execute(delete_query)


        insert_data_query = """
        INSERT INTO `Areas` (`AREA`, `Area_Name`)
        VALUES (%s, %s)
        """

        # Using try-except block to catch errors
        # print(Victim_df[0])
        try:
            
            # cursor.execute(insert_data_query, Victim_df[0])
            cursor.executemany(insert_data_query, Areas_df)
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

    
        fetch_data_query = """
        SELECT * 
        FROM `Areas`
        """

        # Using try-except block to catch errors
        try:
            
            cursor.execute(fetch_data_query)
            # cursor.executemany(insert_data_query, Victim_df)
            result = cursor.fetchall()
            for row in result[:5]:
                print("Data in Areas: ",row)
            print("Data Len in Areas: ", len(result))
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
    
    def Weapons_Table_Create():
        # Victims
        # Insert data into the table
        delete_query = "DELETE FROM `Weapons`"
        cursor.execute(delete_query)


        insert_data_query = """
        INSERT INTO `Weapons` (`Weapon_Used_Cd`, `Weapon_Desc`)
        VALUES (%s, %s)
        """

        # Using try-except block to catch errors
        # print(Victim_df[0])
        try:
            
            # cursor.execute(insert_data_query, Victim_df[0])
            cursor.executemany(insert_data_query, Weapon_df)
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

    
        fetch_data_query = """
        SELECT * 
        FROM `Weapons`
        """

        # Using try-except block to catch errors
        try:
            
            cursor.execute(fetch_data_query)
            # cursor.executemany(insert_data_query, Victim_df)
            result = cursor.fetchall()
            for row in result[:5]:
                print("Data in Weapons: ",row)
            print("Data Len in Weapons: ", len(result))
            connection.commit()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
    # Close the cursor and the connection
    
    Victims_Table_Create()
    Areas_Table_Create()
    Weapons_Table_Create()
    cursor.close()
    connection.close()

Victim_df, Weapon_df, Areas_df = data_processing()
# Prepare default values for each DataFrame
default_values_victim = {
    'DR_NO': 0,
    'Vict Age': 0,
    'Vict Sex': '',
    'Weapon Used Cd': 0.0,
    'AREA': 0,
    'LAT': 0.0,
    'LON': 0.0
}

default_values_weapon = {
    'Weapon Used Cd': 0.0,
    'Weapon Desc': ''
}

default_values_areas = {
    'AREA': 0,
    'AREA NAME': ''
}

# Call df_to_tuples with the appropriate default values
Victim_df = df_to_tuples(Victim_df, default_values_victim)
Weapon_df = df_to_tuples(Weapon_df, default_values_weapon)
Areas_df = df_to_tuples(Areas_df, default_values_areas)
print(Victim_df[:5], Weapon_df[:5], Areas_df[:5])
db(Victim_df, Weapon_df, Areas_df)




