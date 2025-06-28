
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime, timedelta
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
DATA_FOLDER = 'data'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DATA_FOLDER, exist_ok=True)

# Cheat codes for different features
CHEAT_CODES = {
    'bm0123': {'type': 'casual', 'description': 'Casual dress code allowed'},
    'bm0111': {'type': 'fever', 'description': 'Health monitoring waived'},
    'bm0789': {'type': 'casual', 'description': 'Extended break time'},
    'bm0456': {'type': 'fever', 'description': 'Remote work option'},
    'ts2024': {'type': 'timestamp', 'description': 'Backdated entry for 2024', 'allowsBackdating': True},
    'flex01': {'type': 'timestamp', 'description': 'Flexible timing mode', 'allowsFlexibleHours': True},
    'early9': {'type': 'timestamp', 'description': 'Early bird - 9 AM start', 'fixedStartTime': '09:00'},
    'night8': {'type': 'timestamp', 'description': 'Night shift - 8 PM start', 'fixedStartTime': '20:00'},
    'admin0': {'type': 'timestamp', 'description': 'Admin override for any time', 'adminOverride': True}
}

# Professional background images
PROFESSIONAL_BACKGROUNDS = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1554774853-719586f82d77?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop'
]

@app.route('/')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'BookMind AI Backend API is running',
        'version': '2.0.0',
        'developers': ['Irfana Farhath', 'Asaraf'],
        'contact': ['irfanafarhath@gmail.com', 'asaraf@gmail.com'],
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/validate-cheat-code', methods=['POST'])
def validate_cheat_code():
    """Validate cheat codes for special features"""
    try:
        data = request.get_json()
        code = data.get('code', '').strip()
        
        if code in CHEAT_CODES:
            cheat_info = CHEAT_CODES[code]
            logger.info(f"Valid cheat code used: {code}")
            return jsonify({
                'valid': True,
                'type': cheat_info['type'],
                'description': cheat_info['description'],
                'features': {k: v for k, v in cheat_info.items() if k not in ['type', 'description']}
            })
        else:
            logger.warning(f"Invalid cheat code attempted: {code}")
            return jsonify({
                'valid': False,
                'message': 'Invalid cheat code'
            })
    except Exception as e:
        logger.error(f"Error validating cheat code: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/timestamp-override', methods=['POST'])
def timestamp_override():
    """Handle timestamp overrides with cheat codes"""
    try:
        data = request.get_json()
        code = data.get('cheatCode', '').strip()
        requested_time = data.get('timestamp')
        
        if code not in CHEAT_CODES:
            return jsonify({'error': 'Invalid cheat code'}), 400
            
        cheat_info = CHEAT_CODES[code]
        
        if cheat_info['type'] != 'timestamp':
            return jsonify({'error': 'Cheat code not applicable for timestamp override'}), 400
            
        # Process timestamp based on cheat code features
        result = {
            'success': True,
            'originalTime': requested_time,
            'cheatCode': code,
            'description': cheat_info['description']
        }
        
        # Handle different timestamp features
        if cheat_info.get('allowsBackdating'):
            result['backdatingAllowed'] = True
            result['modifiedTime'] = requested_time
            
        elif cheat_info.get('fixedStartTime'):
            fixed_time = cheat_info['fixedStartTime']
            result['fixedTime'] = fixed_time
            result['modifiedTime'] = fixed_time
            
        elif cheat_info.get('adminOverride'):
            result['adminOverride'] = True
            result['modifiedTime'] = requested_time
            
        elif cheat_info.get('allowsFlexibleHours'):
            result['flexibleHours'] = True
            result['modifiedTime'] = requested_time
            
        logger.info(f"Timestamp override applied: {code} for time {requested_time}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error processing timestamp override: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/backgrounds', methods=['GET'])
def get_backgrounds():
    """Get professional background images"""
    try:
        return jsonify({
            'backgrounds': PROFESSIONAL_BACKGROUNDS,
            'count': len(PROFESSIONAL_BACKGROUNDS)
        })
    except Exception as e:
        logger.error(f"Error fetching backgrounds: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/system-stats', methods=['GET'])
def get_system_stats():
    """Get system statistics for admin dashboard"""
    try:
        # Mock system statistics
        stats = {
            'totalEmployees': 156,
            'activeBookings': 89,
            'openIncidents': 7,
            'pendingTasks': 23,
            'systemHealth': 'operational',
            'activeUsers': 142,
            'engagementRate': '89%',
            'averageResponseTime': '2.3s',
            'lastUpdated': datetime.now().isoformat()
        }
        
        return jsonify(stats)
    except Exception as e:
        logger.error(f"Error fetching system stats: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/employee-achievements', methods=['GET'])
def get_employee_achievements():
    """Get employee achievements for dashboard"""
    try:
        user_id = request.args.get('userId')
        
        # Mock achievements data
        achievements = [
            {
                'title': 'Perfect Attendance',
                'description': 'No missed days this month',
                'icon': 'award',
                'earnedDate': datetime.now().isoformat(),
                'points': 100
            },
            {
                'title': 'Early Bird',
                'description': 'Consistently on time',
                'icon': 'target',
                'earnedDate': (datetime.now() - timedelta(days=7)).isoformat(),
                'points': 50
            },
            {
                'title': 'Team Player',
                'description': 'Helped 5+ colleagues',
                'icon': 'activity',
                'earnedDate': (datetime.now() - timedelta(days=14)).isoformat(),
                'points': 75
            }
        ]
        
        return jsonify({
            'achievements': achievements,
            'totalPoints': sum(a['points'] for a in achievements),
            'userId': user_id
        })
    except Exception as e:
        logger.error(f"Error fetching achievements: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/developer-info', methods=['GET'])
def get_developer_info():
    """Get developer information"""
    try:
        developer_info = {
            'developers': [
                {
                    'name': 'Irfana Farhath',
                    'role': 'Lead Developer',
                    'email': 'irfanafarhath@gmail.com',
                    'initials': 'IF',
                    'color': 'blue'
                },
                {
                    'name': 'Asaraf',
                    'role': 'Partner Developer',
                    'email': 'asaraf@gmail.com',
                    'initials': 'AS',
                    'color': 'purple'
                }
            ],
            'project': {
                'name': 'BookMind AI',
                'description': 'Professional Corporate Management System',
                'version': '2.0.0',
                'technologies': ['React', 'TypeScript', 'Firebase', 'Flask', 'Python'],
                'year': '2024'
            }
        }
        
        return jsonify(developer_info)
    except Exception as e:
        logger.error(f"Error fetching developer info: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    """Handle image uploads for the application"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
            
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
            
        # Save the uploaded file
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        logger.info(f"Image uploaded successfully: {filename}")
        return jsonify({
            'success': True,
            'filename': filename,
            'url': f'/uploads/{filename}',
            'message': 'Image uploaded successfully'
        })
        
    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'The requested API endpoint does not exist',
        'available_endpoints': [
            '/api/validate-cheat-code',
            '/api/timestamp-override',
            '/api/backgrounds',
            '/api/system-stats',
            '/api/employee-achievements',
            '/api/developer-info',
            '/api/upload-image'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred on the server'
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Starting BookMind AI Backend API on port {port}")
    logger.info("Developed by Irfana Farhath & Asaraf")
    logger.info("Contact: irfanafarhath@gmail.com, asaraf@gmail.com")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
