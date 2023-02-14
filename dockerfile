FROM mcr.microsoft.com/azure-sql-edge:latest

USER root

# Set environment variables
ENV SA_PASSWORD=log-onCp9
ENV ACCEPT_EULA=Y

# Create a directory for the sql scripts
RUN mkdir -p /usr/src/sql
WORKDIR /usr/src/sql

# Copy the SQL scripts from your local machine to the container
COPY ./create.sql .

# Set permissions on script
RUN chmod +x ./create.sql

EXPOSE 1433

USER mssql
CMD /opt/mssql/bin/sqlservr & /bin/bash -c "sleep 30s && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i create.sql" && tail -f /dev/null

