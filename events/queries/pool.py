from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])# to connect database