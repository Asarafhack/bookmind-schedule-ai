
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime, timedelta
import uuid
import os

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = 'bookmind.db'

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create bookings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            user_email TEXT NOT NULL,
            booking_code TEXT NOT NULL,
            region TEXT NOT NULL,
            date TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    ''')
    
    # Create incidents table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS incidents (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            user_email TEXT NOT NULL,
            incident_type TEXT NOT NULL,
            description TEXT,
            region TEXT NOT NULL,
            status TEXT DEFAULT 'open',
            created_at TEXT NOT NULL,
            resolved_at TEXT
        )
    ''')
    
    # Create tasks table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            assigned_to TEXT NOT NULL,
            assigned_by TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT DEFAULT 'medium',
            status TEXT DEFAULT 'pending',
            due_date TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database
init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "BookMind API is running"})

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    """Create a new seat booking"""
    try:
        data = request.get_json()
        
        booking_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO bookings 
            (id, user_id, user_email, booking_code, region, date, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            booking_id,
            data['user_id'],
            data['user_email'],
            data['booking_code'],
            data['region'],
            data['date'],
            created_at,
            created_at
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "success": True,
            "booking_id": booking_id,
            "message": "Booking created successfully"
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    """Get bookings (admin can see all, users see their own)"""
    try:
        user_id = request.args.get('user_id')
        is_admin = request.args.get('is_admin', 'false').lower() == 'true'
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if is_admin:
            cursor.execute('SELECT * FROM bookings ORDER BY created_at DESC')
        else:
            cursor.execute('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
        
        bookings = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({"success": True, "bookings": bookings})
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/bookings/<booking_id>/status', methods=['PUT'])
def update_booking_status():
    """Update booking status (admin only)"""
    try:
        data = request.get_json()
        booking_id = request.view_args['booking_id']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE bookings 
            SET status = ?, updated_at = ?
            WHERE id = ?
        ''', (data['status'], datetime.now().isoformat(), booking_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "message": "Booking status updated"})
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/incidents', methods=['POST'])
def create_incident():
    """Create a new incident report"""
    try:
        data = request.get_json()
        
        incident_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO incidents 
            (id, user_id, user_email, incident_type, description, region, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            incident_id,
            data['user_id'],
            data['user_email'],
            data['incident_type'],
            data.get('description', ''),
            data['region'],
            created_at
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "success": True,
            "incident_id": incident_id,
            "message": "Incident reported successfully"
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    """Get incidents"""
    try:
        user_id = request.args.get('user_id')
        is_admin = request.args.get('is_admin', 'false').lower() == 'true'
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if is_admin:
            cursor.execute('SELECT * FROM incidents ORDER BY created_at DESC')
        else:
            cursor.execute('SELECT * FROM incidents WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
        
        incidents = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({"success": True, "incidents": incidents})
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/incidents/<incident_id>/resolve', methods=['PUT'])
def resolve_incident():
    """Resolve an incident (admin only)"""
    try:
        incident_id = request.view_args['incident_id']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE incidents 
            SET status = 'resolved', resolved_at = ?
            WHERE id = ?
        ''', (datetime.now().isoformat(), incident_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "message": "Incident resolved"})
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Create a new task (admin only)"""
    try:
        data = request.get_json()
        
        task_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO tasks 
            (id, assigned_to, assigned_by, title, description, priority, due_date, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            task_id,
            data['assigned_to'],
            data['assigned_by'],
            data['title'],
            data.get('description', ''),
            data.get('priority', 'medium'),
            data.get('due_date'),
            created_at,
            created_at
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "success": True,
            "task_id": task_id,
            "message": "Task created successfully"
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Get tasks"""
    try:
        user_id = request.args.get('user_id')
        is_admin = request.args.get('is_admin', 'false').lower() == 'true'
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if is_admin:
            cursor.execute('SELECT * FROM tasks ORDER BY created_at DESC')
        else:
            cursor.execute('SELECT * FROM tasks WHERE assigned_to = ? ORDER BY created_at DESC', (user_id,))
        
        tasks = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({"success": True, "tasks": tasks})
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/analytics/bookings', methods=['GET'])
def get_booking_analytics():
    """Get booking analytics (admin only)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get bookings by region
        cursor.execute('''
            SELECT region, COUNT(*) as count, status
            FROM bookings 
            GROUP BY region, status
        ''')
        region_stats = cursor.fetchall()
        
        # Get daily bookings for the last 30 days
        thirty_days_ago = (datetime.now() - timedelta(days=30)).isoformat()
        cursor.execute('''
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM bookings 
            WHERE created_at >= ?
            GROUP BY DATE(created_at)
            ORDER BY date
        ''', (thirty_days_ago,))
        daily_stats = cursor.fetchall()
        
        conn.close()
        
        return jsonify({
            "success": True,
            "analytics": {
                "region_stats": [dict(row) for row in region_stats],
                "daily_stats": [dict(row) for row in daily_stats]
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

if __name__ == '__main__':
    print("🚀 BookMind API Server Starting...")
    print("📊 Database initialized successfully")
    print("🔗 Server running on http://localhost:5000")
    print("📋 Available endpoints:")
    print("   - GET  /api/health")
    print("   - POST /api/bookings")
    print("   - GET  /api/bookings")
    print("   - POST /api/incidents") 
    print("   - GET  /api/incidents")
    print("   - POST /api/tasks")
    print("   - GET  /api/tasks")
    print("   - GET  /api/analytics/bookings")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
