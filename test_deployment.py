#!/usr/bin/env python3
"""
Test script to validate Vercel deployment
Run this script to test the main endpoints after deployment
"""

import requests
import sys
import json

def test_deployment(base_url):
    """Test the deployed application endpoints"""
    
    print(f"🧪 Testing deployment at: {base_url}")
    print("=" * 50)
    
    tests_passed = 0
    tests_total = 0
    
    # Test 1: Health check
    tests_total += 1
    try:
        response = requests.get(f"{base_url}/health", timeout=30)
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check: PASSED")
            print(f"   Status: {data.get('status', 'unknown')}")
            tests_passed += 1
        else:
            print(f"❌ Health check: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Health check: FAILED (Error: {e})")
    
    # Test 2: App info
    tests_total += 1
    try:
        response = requests.get(f"{base_url}/info", timeout=30)
        if response.status_code == 200:
            data = response.json()
            print("✅ App info: PASSED")
            print(f"   Name: {data.get('name', 'unknown')}")
            print(f"   Version: {data.get('version', 'unknown')}")
            tests_passed += 1
        else:
            print(f"❌ App info: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ App info: FAILED (Error: {e})")
    
    # Test 3: Main page
    tests_total += 1
    try:
        response = requests.get(f"{base_url}/", timeout=30)
        if response.status_code == 200 and "html" in response.headers.get('content-type', ''):
            print("✅ Main page: PASSED")
            print(f"   Content length: {len(response.text)} characters")
            if "Plant Health AI" in response.text or "plant" in response.text.lower():
                print("   Contains expected content: ✅")
            else:
                print("   Content check: ⚠️  (might not contain expected text)")
            tests_passed += 1
        else:
            print(f"❌ Main page: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Main page: FAILED (Error: {e})")
    
    # Test 4: Static files (CSS)
    tests_total += 1
    try:
        response = requests.get(f"{base_url}/static/css/style.css", timeout=30)
        if response.status_code == 200:
            print("✅ Static CSS: PASSED")
            tests_passed += 1
        else:
            print(f"❌ Static CSS: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Static CSS: FAILED (Error: {e})")
    
    # Test 5: API endpoint (without file upload)
    tests_total += 1
    try:
        response = requests.post(f"{base_url}/api/predict", timeout=30)
        # We expect a 400 error since we're not sending a file
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print("✅ API endpoint: PASSED (correctly rejects empty request)")
                tests_passed += 1
            else:
                print("❌ API endpoint: FAILED (unexpected response format)")
        else:
            print(f"❌ API endpoint: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ API endpoint: FAILED (Error: {e})")
    
    print("=" * 50)
    print(f"📊 Tests Summary: {tests_passed}/{tests_total} passed")
    
    if tests_passed == tests_total:
        print("🎉 All tests passed! Deployment looks good.")
        return True
    elif tests_passed >= tests_total * 0.8:
        print("⚠️  Most tests passed. Deployment is mostly working.")
        return True
    else:
        print("❌ Many tests failed. There may be deployment issues.")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test_deployment.py <base_url>")
        print("Example: python test_deployment.py https://your-app.vercel.app")
        sys.exit(1)
    
    base_url = sys.argv[1].rstrip('/')
    success = test_deployment(base_url)
    sys.exit(0 if success else 1)