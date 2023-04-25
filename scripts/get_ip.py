import requests

# Make a GET request to the ipify API to get the public IP address
response = requests.get('https://api.ipify.org?format=json')

# Get the JSON response and extract the IP address
ip_address = response.json()['ip']

# Print the IP address
print('Public IP address:', ip_address)
