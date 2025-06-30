# Use an official Maven image to build the Spring Boot app
FROM maven:3.9.6-eclipse-temurin-21 as build

WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

#Run with java 21
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy only the jar file
COPY --from=build /app/target/ExpenseTracker-0.0.1-SNAPSHOT.jar .

# Expose port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "ExpenseTracker-0.0.1-SNAPSHOT.jar"]