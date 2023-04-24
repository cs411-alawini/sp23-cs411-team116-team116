import mysql.connector

# Replace the values with your database connection details
db_config = {
    'host':'34.27.148.60',
    'user': 'root',
    'password':'1234',
    'database':'CS411CrimeData',
}

cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

def test_store_procedure():
    # Create a cursor.
    cursor = cnx.cursor()

    # Set the input parameters
    user_id = 1
    latitude = 34.062265
    longitude = -118.246
    radius = 1000

    # Call the GetCrimeInfo stored procedure
    query = "CALL GetCrimeInfo(%s, %s, %s, %s, @output_query_id);"
    cursor.execute(query, (user_id, latitude, longitude, radius))

    # Fetch the output parameter value.
    cursor.execute("SELECT @output_query_id;")
    query_id = cursor.fetchone()[0]

    # Commit the changes
    cnx.commit()

    # Get the query result
    cursor.execute("SELECT * FROM Query WHERE Query_ID = %s", (query_id,))
    result = cursor.fetchall()

    # Print the result
    for row in result:
        print(row)

    # Close the cursor and connection.
    cursor.close()
    cnx.close()


def test_trigger():

    # Insert a new user into the User table
    user_query = "INSERT INTO User (User_Id, Hashed_Password) VALUES (%s, %s)"
    user_values = (1, "aaa")
    cursor.execute(user_query, user_values)
    cnx.commit()

    # Query the Query table and print the results
    query_query = "SELECT * FROM `Query`"
    cursor.execute(query_query)
    query_results = cursor.fetchall()
    print("Query table:")
    for row in query_results:
        print(row)

    # Query the User table and print the results
    user_query = "SELECT * FROM `User`"
    cursor.execute(user_query)
    user_results = cursor.fetchall()
    print("User table:")
    for row in user_results:
        print(row)

    # Delete the user with User_Id = 1 from the User table
    delete_query = "DELETE FROM `User` WHERE User_Id = %s"
    delete_values = (1,)
    cursor.execute(delete_query, delete_values)
    cnx.commit()

    # Query the Query table and print the results
    query_query = "SELECT * FROM `Query`"
    cursor.execute(query_query)
    query_results = cursor.fetchall()
    print("Query table after deleting user:")
    for row in query_results:
        print(row)

    # Query the User table and print the results
    user_query = "SELECT * FROM `User`"
    cursor.execute(user_query)
    user_results = cursor.fetchall()
    print("User table after deleting user:")
    for row in user_results:
        print(row)


# test_store_procedure()
test_trigger()

# cursor.close()
# cnx.close()