#!/bin/sh

# Wait for the database to be available
echo "Waiting for database to be available..."

npx prisma db push
echo "Database is available."
export PGPASSWORD=postgres
# Run the initial database setup
psql -h db -U postgres -d db_dev -f /app/init.sql

# Start the Next.js application
exec npm run dev
