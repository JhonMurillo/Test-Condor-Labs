# Test Condor Labs

# Test Backend
Developed with microservice architecture (Spring Boot)

# Previous Requirements
jdk 8, Configured environment variables (JAVA_HOME)

# Project execution
	1. Clone repository.
	2. Enter CMD Windows or Terminal(Linux - MacOs).
	3. cd <project route>\Test-Condor-Labs\App\target
	4. run java -jar App-1.0.jar

# Api

http://localhost:8090/

Routes
	
	1. READ
		curl -X GET --header 'Accept: application/json' 'http://localhost:8090/provider/all'
	
	2. CREATED
		curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
		  "assignedTo": 0,
		  "createdBy": 0,
		  "email": "string",
		  "employerId": 0,
		  "firstName": "string",
		  "lastName": "string",
		  "middleName": "string",
		  "projectedStartDate": "string",
		  "providerType": "string",
		  "specialtyDTO": {
			"createdAt": "string",
			"createdBy": 0,
			"name": "string",
			"updatedAt": "string",
			"updatedBy": 0
		  },
		  "staffStatus": "string",
		  "status": "string",
		  "updatedBy": 0
		}' 'http://localhost:8090/provider/save'
		
	3. UPDATE
		curl -X PUT --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
		  "assignedTo": 0,
		  "createdBy": 0,
		  "email": "string1",
		  "employerId": 0,
		  "firstName": "string1",
		  "id": "5a729df77c18d043ccef474a",
		  "lastName": "string1",
		  "middleName": "string1",
		  "projectedStartDate": "string1",
		  "providerType": "string1",
		  "specialtyDTO": {
			"createdAt": "string1",
			"createdBy": 1,
			"id": "5a729df67c18d043ccef4749",
			"name": "string1",
			"updatedAt": "string1",
			"updatedBy": 1
		  },
		  "staffStatus": "string",
		  "status": "string",
		  "updatedBy": 0
		}' 'http://localhost:8090/provider/update'
	
	4. DELETE
		curl -X DELETE --header 'Accept: application/json' 'http://localhost:8090/provider/delete/5a729df77c18d043ccef474a'
	

The project has the swagger-ui tool, which allows you to test the exposed services.
http://localhost:8090/swagger-ui.html

# Test Frontend

Project created with Yeoman-angular 1.5

# Previous Requirements

Node(v8.9.4), npm(v5.6.0), git

# Dependency installation
	
	1. Clone repository, if you already made this step, omit.
	2. Enter CMD Windows or Terminal(Linux - MacOs).
	3. cd <project route>\Test-Condor-Labs\front
	4. run npm install -g bower@latest
	5. run bower install(If the bower command doesn't work, close and open the console again.)
		5.1. AngularJs is chosen for the app-d project
		![Bower](https://raw.githubusercontent.com/JhonMurillo/Test-Condor-Labs/master/bower.png)
	6. run npm install
	7. run npm install -g grunt-cli yo

# Project execution
	
	1. Clone repository, if you already made this step, omit.
	2. Enter CMD Windows or Terminal(Linux - MacOs).
	3. cd <project route>\Test-Condor-Labs\front
	4. run grunt serve -f
	
To navigate in the application, enter to the route http://localhost:9000/#!/

# Test SQL

Queries for reports

