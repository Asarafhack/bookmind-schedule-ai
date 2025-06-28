
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)
CORS(app)

# Cheat codes for timestamp manipulation
TIMESTAMP_CHEAT_CODES = {
    'ts2024': {'type': 'backdate', 'description': 'Backdated entry for 2024'},
    'flex01': {'type': 'flexible', 'description': 'Flexible timing mode'},
    'early9': {'type': 'fixed_start', 'description': 'Early bird - 9 AM start', 'time': '09:00'},
    'night8': {'type': 'fixed_start', 'description': 'Night shift - 8 PM start', 'time': '20:00'},
    'admin0': {'type': 'admin_override', 'description': 'Admin override for any time'}
}

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })

@app.route('/api/cheat-codes/validate', methods=['POST'])
def validate_cheat_code():
    data = request.get_json()
    code = data.get('code')
    code_type = data.get('type', 'timestamp')
    
    if code in TIMESTAMP_CHEAT_CODES:
        cheat_info = TIMESTAMP_CHEAT_CODES[code]
        return jsonify({
            'valid': True,
            'code': code,
            'type': cheat_info['type'],
            'description': cheat_info['description'],
            'metadata': cheat_info
        })
    
    return jsonify({
        'valid': False,
        'message': 'Invalid cheat code'
    })

@app.route('/api/timestamp/manipulate', methods=['POST'])
def manipulate_timestamp():
    data = request.get_json()
    cheat_code = data.get('cheat_code')
    base_time = data.get('base_time', datetime.now().isoformat())
    
    if cheat_code not in TIMESTAMP_CHEAT_CODES:
        return jsonify({'error': 'Invalid cheat code'}), 400
    
    cheat_info = TIMESTAMP_CHEAT_CODES[cheat_code]
    base_dt = datetime.fromisoformat(base_time.replace('Z', '+00:00'))
    
    if cheat_info['type'] == 'backdate':
        # Allow backdating up to 1 year
        manipulated_time = base_dt - timedelta(days=365)
    elif cheat_info['type'] == 'flexible':
        # Add flexible timing allowance
        manipulated_time = base_dt
    elif cheat_info['type'] == 'fixed_start':
        # Set fixed start time
        time_parts = cheat_info['time'].split(':')
        manipulated_time = base_dt.replace(
            hour=int(time_parts[0]), 
            minute=int(time_parts[1]), 
            second=0
        )
    elif cheat_info['type'] == 'admin_override':
        # Admin can set any time
        manipulated_time = base_dt
    else:
        manipulated_time = base_dt
    
    return jsonify({
        'original_time': base_time,
        'manipulated_time': manipulated_time.isoformat(),
        'cheat_code': cheat_code,
        'description': cheat_info['description']
    })

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    # Mock admin statistics
    return jsonify({
        'total_employees': 156,
        'active_bookings': 89,
        'open_incidents': 7,
        'pending_tasks': 23,
        'system_health': 'operational',
        'engagement_rate': 89,
        'avg_response_time': '2.3s'
    })

@app.route('/api/employee/achievements', methods=['GET'])
def get_employee_achievements():
    employee_id = request.args.get('employee_id')
    
    # Mock achievements data
    achievements = [
        {
            'title': 'Perfect Attendance',
            'description': 'No missed days this month',
            'icon': 'award',
            'earned_date': '2024-06-15'
        },
        {
            'title': 'Early Bird',
            'description': 'Consistently on time',
            'icon': 'target',
            'earned_date': '2024-06-10'
        },
        {
            'title': 'Team Player',
            'description': 'Helped 5+ colleagues',
            'icon': 'activity',
            'earned_date': '2024-06-20'
        }
    ]
    
    return jsonify({
        'employee_id': employee_id,
        'achievements': achievements
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
