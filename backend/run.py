#!/usr/bin/env python3
import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False
    return True

def run_server():
    """Run the Flask server"""
    try:
        print("🚀 Starting ML Backend Server...")
        print("📊 Loading dataset and training models...")
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error running server: {e}")

if __name__ == "__main__":
    print("🔧 Setting up Energy Prediction ML Backend...")
    
    if install_requirements():
        run_server()
    else:
        print("❌ Failed to install dependencies. Please check your Python environment.")
        sys.exit(1)