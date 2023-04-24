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
    # Connect to the database


    # Set the input parameters
    user_id = 1
    latitude = 34.062265
    longitude = -118.246
    radius = 1000
    query_id = 0
    # Call the GetCrimeInfo stored procedure
    result_args = cursor.callproc("GetCrimeInfo", [user_id, latitude, longitude, radius, query_id])

    # Get the output parameter (query_id)
    query_id = result_args[-1]

    # Get the query result
    cursor.execute("SELECT * FROM Query WHERE Query_ID = %s", (query_id,))
    result = cursor.fetchall()

    # Print the result
    for row in result:
        print(row)

    # Execute the query
    cursor.execute("SELECT IFNULL(MAX(Query_ID), 0) FROM Query")

    # Fetch the result
    result = cursor.fetchone()[0]

    # Print the result
    print(result)

    query_id = 0
    # Call the GetCrimeInfo stored procedure
    result_args = cursor.callproc("GetCrimeInfo", [user_id, latitude, longitude, radius, query_id])

    # Get the output parameter (query_id)
    query_id = result_args[-1]

    # Get the query result
    cursor.execute("SELECT * FROM Query WHERE Query_ID = %s", (query_id,))
    result = cursor.fetchall()

    # Print the result
    for row in result:
        print(row)
    # Get the query result
    cursor.execute("SELECT * FROM Query")
    result = cursor.fetchall()

    # Print the result
    for row in result:
        print(row)


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


test_store_procedure()
# test_trigger()

# cursor.close()
# cnx.close()