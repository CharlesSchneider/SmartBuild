
FROM mcr.microsoft.com/mssql/server:2019-latest

USER root
RUN mkdir /var/opt/sqlserver

COPY BaldassoFinanceiro.mdf /var/opt/sqlserver
COPY BaldassoFinanceiro_log.ldf /var/opt/sqlserver

ENV SA_PASSWORD=Pass@word
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Express

 HEALTHCHECK --interval=10s \
	CMD /opt/mssql-tools/bin/sqlcmd -S . -U sa -P "Pass@word" \
	-Q "CREATE DATABASE [BaldassoFinanceiro] ON (FILENAME = '/var/opt/sqlserver/BaldassoFinanceiro.mdf'),(FILENAME = '/var/opt/sqlserver/BaldassoFinanceiro_log.ldf') FOR ATTACH;"
