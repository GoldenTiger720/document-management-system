#!/bin/bash

# Document Management System - Server Startup Script

echo "================================================"
echo "  Document Management System - DocuSign Pro"
echo "================================================"
echo ""
echo "Starting local web server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to serve the application..."
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Demo Accounts:"
    echo "  Finance Admin:   admin1 / admin123"
    echo "  HR Admin:        admin2 / admin123"
    echo "  Finance Operator: operator1 / oper123"
    echo "  HR Operator:     operator2 / oper123"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python3 -m http.server 8000

# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "Using Python 2 to serve the application..."
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Demo Accounts:"
    echo "  Finance Admin:   admin1 / admin123"
    echo "  HR Admin:        admin2 / admin123"
    echo "  Finance Operator: operator1 / oper123"
    echo "  HR Operator:     operator2 / oper123"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python -m SimpleHTTPServer 8000

# Check if PHP is available
elif command -v php &> /dev/null; then
    echo "Using PHP to serve the application..."
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Demo Accounts:"
    echo "  Finance Admin:   admin1 / admin123"
    echo "  HR Admin:        admin2 / admin123"
    echo "  Finance Operator: operator1 / oper123"
    echo "  HR Operator:     operator2 / oper123"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    php -S localhost:8000

# Check if Node.js/npx is available
elif command -v npx &> /dev/null; then
    echo "Using Node.js http-server to serve the application..."
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Demo Accounts:"
    echo "  Finance Admin:   admin1 / admin123"
    echo "  HR Admin:        admin2 / admin123"
    echo "  Finance Operator: operator1 / oper123"
    echo "  HR Operator:     operator2 / oper123"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    npx http-server -p 8000

else
    echo "ERROR: No suitable web server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: sudo apt-get install python3"
    echo "  - Python 2: sudo apt-get install python"
    echo "  - PHP: sudo apt-get install php"
    echo "  - Node.js: sudo apt-get install nodejs npm"
    echo ""
    echo "Or open index.html directly in your browser"
    exit 1
fi
