FROM openjdk:21-jdk-slim
ARG WAR_FILE=target/nepremicnine-0.0.1-SNAPSHOT.war
COPY ${WAR_FILE} nepremicnine.war
ENTRYPOINT ["java","-jar","/nepremicnine.war"]
EXPOSE 8080
