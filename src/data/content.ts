export interface ContentSection {
  id: string;
  title: string;
  content: string;
  codeExamples?: Array<{
    languages: Record<string, string>;
  }>;
}

export const apiContent: ContentSection[] = [
  {
    id: 'home',
    title: 'Welcome to EnergyAPI',
    content: `
# EnergyAPI Documentation

Welcome to the comprehensive EnergyAPI documentation. This API provides real-time access to energy market data, including futures, ancillary services, renewable energy certificates (RECs), and utility pricing information.

## Getting Started

1. **Obtain an API Key**: Sign up for an account to get your unique API key
2. **Review Authentication**: Learn how to authenticate your requests
3. **Explore Endpoints**: Browse our available endpoints and data sources
4. **Test Integration**: Use our interactive examples to test your implementation

## Base URL

All API requests should be made to:

\`\`\`
https://api.energy-platform.com/v1
\`\`\`

## Rate Limits

- **Free Tier**: 1,000 requests per month
- **Pro Tier**: 10,000 requests per month  
- **Enterprise**: Custom limits available

## Support

For technical support, please contact our team at [developers@energy-platform.com](mailto:developers@energy-platform.com)
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import json

# API Configuration
BASE_URL = "https://api.energy-platform.com/v1"
API_KEY = "your-api-key-here"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
    "User-Agent": "EnergyAPI-Client/1.0"
}

def check_api_status():
    """Check if the API is operational"""
    try:
        response = requests.get(f"{BASE_URL}/status", headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print(f"✅ API Status: {data.get('status', 'Unknown')}")
        print(f"📊 Version: {data.get('version', 'N/A')}")
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to API: {e}")
        return None

# Test the connection
if __name__ == "__main__":
    status = check_api_status()`,
          javascript: `// EnergyAPI Client Configuration
const BASE_URL = "https://api.energy-platform.com/v1";
const API_KEY = "your-api-key-here";

const defaultHeaders = {
  "X-API-Key": API_KEY,
  "Content-Type": "application/json",
  "User-Agent": "EnergyAPI-Client/1.0"
};

class EnergyAPIClient {
  constructor(apiKey = API_KEY) {
    this.apiKey = apiKey;
    this.baseURL = BASE_URL;
  }

  async checkStatus() {
    try {
      const response = await fetch(\`\${this.baseURL}/status\`, {
        method: "GET",
        headers: {
          ...defaultHeaders,
          "X-API-Key": this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      console.log("✅ API Status:", data.status);
      console.log("📊 Version:", data.version);
      return data;

    } catch (error) {
      console.error("❌ Error connecting to API:", error);
      throw error;
    }
  }
}

// Usage Example
const client = new EnergyAPIClient();
client.checkStatus().then(status => {
  console.log("API is ready for use!");
});`,
          ruby: `require 'net/http'
require 'json'
require 'uri'

# EnergyAPI Ruby Client
class EnergyAPIClient
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    @api_key = api_key
    @base_uri = URI(BASE_URL)
  end

  def check_status
    uri = URI("#{BASE_URL}/status")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Get.new(uri)
    request['X-API-Key'] = @api_key
    request['Content-Type'] = 'application/json'
    request['User-Agent'] = 'EnergyAPI-Client/1.0'

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        data = JSON.parse(response.body)
        puts "✅ API Status: #{data['status']}"
        puts "📊 Version: #{data['version']}"
        data
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Connection error: #{e.message}"
      nil
    end
  end
end

# Usage Example
client = EnergyAPIClient.new('your-api-key-here')
status = client.check_status`,
          curl: `#!/bin/bash

# EnergyAPI cURL Examples
API_KEY="your-api-key-here"
BASE_URL="https://api.energy-platform.com/v1"

# Function to check API status
check_api_status() {
    echo "🔍 Checking API status..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/status" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json" \\
        -H "User-Agent: EnergyAPI-Client/1.0")
    
    # Extract HTTP status code
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ API Status: $(echo $body | jq -r '.status')"
        echo "📊 Version: $(echo $body | jq -r '.version')"
        echo "🎯 Ready for requests!"
    else
        echo "❌ Error: HTTP $http_code"
        echo "Response: $body"
    fi
}

# Test the API
check_api_status`
        }
      },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication & API Keys',
    content: `
# Authentication

EnergyAPI uses API key authentication. Include your API key in the \`X-API-Key\` header with every request.

## Obtaining Your API Key

1. Create an account at [energy-platform.com](https://energy-platform.com)
2. Navigate to your dashboard
3. Generate a new API key
4. Store it securely (never expose it in client-side code)

## Authentication Headers

All authenticated requests must include:
- \`X-API-Key\`: Your unique API key
- \`Content-Type\`: application/json

## Security Best Practices

- Store API keys as environment variables
- Use HTTPS for all requests
- Rotate keys regularly
- Monitor usage in your dashboard
    `,
    codeExamples: [
      {
        languages: {
          python: `import os
import requests
from typing import Optional, Dict, Any

class EnergyAPIAuth:
    """Secure authentication handler for EnergyAPI"""
    
    def __init__(self, api_key: Optional[str] = None):
        # Load API key from environment or parameter
        self.api_key = api_key or os.getenv('ENERGY_API_KEY')
        
        if not self.api_key:
            raise ValueError(
                "API key required. Set ENERGY_API_KEY environment variable "
                "or pass api_key parameter"
            )
    
    @property
    def headers(self) -> Dict[str, str]:
        """Get authenticated request headers"""
        return {
            'X-API-Key': self.api_key,
            'Content-Type': 'application/json',
            'User-Agent': 'EnergyAPI-Python-Client/1.0'
        }
    
    def test_authentication(self) -> bool:
        """Test if API key is valid"""
        try:
            response = requests.get(
                'https://api.energy-platform.com/v1/auth/verify',
                headers=self.headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Authentication successful!")
                print(f"👤 Account: {data.get('account_name', 'N/A')}")
                print(f"📊 Plan: {data.get('plan', 'N/A')}")
                print(f"🔢 Requests remaining: {data.get('requests_remaining', 'N/A')}")
                return True
            else:
                print(f"❌ Authentication failed: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Connection error: {e}")
            return False

# Usage Example
auth = EnergyAPIAuth()
if auth.test_authentication():
    print("🚀 Ready to make API calls!")`,
          javascript: `// Secure EnergyAPI Authentication
class EnergyAPIAuth {
  constructor(apiKey = null) {
    // Load API key from environment or parameter
    this.apiKey = apiKey || process.env.ENERGY_API_KEY;
    
    if (!this.apiKey) {
      throw new Error(
        'API key required. Set ENERGY_API_KEY environment variable ' +
        'or pass apiKey parameter'
      );
    }
  }

  get headers() {
    return {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': 'EnergyAPI-JS-Client/1.0'
    };
  }

  async testAuthentication() {
    try {
      const response = await fetch(
        'https://api.energy-platform.com/v1/auth/verify',
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Authentication successful!');
        console.log(\`👤 Account: \${data.account_name || 'N/A'}\`);
        console.log(\`📊 Plan: \${data.plan || 'N/A'}\`);
        console.log(\`🔢 Requests remaining: \${data.requests_remaining || 'N/A'}\`);
        return true;
      } else {
        console.error(\`❌ Authentication failed: \${response.status}\`);
        return false;
      }
    } catch (error) {
      console.error('❌ Connection error:', error);
      return false;
    }
  }
}

// Usage Example
const auth = new EnergyAPIAuth();
auth.testAuthentication().then(success => {
  if (success) {
    console.log('🚀 Ready to make API calls!');
  }
});`,
          ruby: `require 'net/http'
require 'json'
require 'uri'

# Secure EnergyAPI Authentication
class EnergyAPIAuth
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key = nil)
    # Load API key from environment or parameter
    @api_key = api_key || ENV['ENERGY_API_KEY']
    
    raise ArgumentError, 'API key required. Set ENERGY_API_KEY environment variable or pass api_key parameter' unless @api_key
  end

  def headers
    {
      'X-API-Key' => @api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def test_authentication
    uri = URI("#{BASE_URL}/auth/verify")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Get.new(uri)
    headers.each { |key, value| request[key] = value }

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        data = JSON.parse(response.body)
        puts "✅ Authentication successful!"
        puts "👤 Account: #{data['account_name'] || 'N/A'}"
        puts "📊 Plan: #{data['plan'] || 'N/A'}"
        puts "🔢 Requests remaining: #{data['requests_remaining'] || 'N/A'}"
        true
      else
        puts "❌ Authentication failed: #{response.code} - #{response.message}"
        false
      end
      
    rescue StandardError => e
      puts "❌ Connection error: #{e.message}"
      false
    end
  end
end

# Usage Example
auth = EnergyAPIAuth.new
if auth.test_authentication
  puts '🚀 Ready to make API calls!'
end`,
          curl: `#!/bin/bash

# Secure EnergyAPI Authentication Script
API_KEY="your-api-key-here"
BASE_URL="https://api.energy-platform.com/v1"

# Check if API key is set
if [ -z "$API_KEY" ] || [ "$API_KEY" = "your-api-key-here" ]; then
    echo "❌ Error: Please set your ENERGY_API_KEY environment variable"
    echo "   export ENERGY_API_KEY='your-actual-api-key'"
    exit 1
fi

# Function to test authentication
test_authentication() {
    echo "🔐 Testing API authentication..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/auth/verify" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json" \\
        -H "User-Agent: EnergyAPI-cURL-Client/1.0")
    
    # Extract HTTP status and body
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ Authentication successful!"
        echo "👤 Account: $(echo $body | jq -r '.account_name // "N/A"')"
        echo "📊 Plan: $(echo $body | jq -r '.plan // "N/A"')"
        echo "🔢 Requests remaining: $(echo $body | jq -r '.requests_remaining // "N/A"')"
        echo "🚀 Ready to make API calls!"
        return 0
    else
        echo "❌ Authentication failed: HTTP $http_code"
        echo "Response: $body"
        return 1
    fi
}

# Run authentication test
test_authentication`
        }
      },
    ],
  },
  {
    id: 'energy-futures',
    title: 'Energy Futures',
    content: `
# Energy Futures

Access real-time and historical energy futures data including natural gas, crude oil, and electricity futures contracts.

## Available Endpoints

### GET /futures
Retrieve current futures prices and market data

### GET /futures/historical
Access historical futures data with customizable time ranges

## Supported Markets

- **Natural Gas**: Henry Hub, AECO, NBP
- **Crude Oil**: WTI, Brent, RBOB
- **Electricity**: PJM, ERCOT, CAISO
- **Coal**: API2, Newcastle, Richards Bay

## Query Parameters

- \`market\`: Market identifier (required)
- \`contract\`: Contract month (YYYY-MM format)
- \`limit\`: Number of records (max 1000)
- \`from\`: Start date (ISO 8601)
- \`to\`: End date (ISO 8601)
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict, Optional

class EnergyFuturesAPI:
    """Professional client for Energy Futures data"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.energy-platform.com/v1"
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def get_current_futures(self, market: str, contract: Optional[str] = None) -> Dict:
        """Get current futures prices for a specific market"""
        params = {'market': market}
        if contract:
            params['contract'] = contract
            
        response = requests.get(
            f"{self.base_url}/futures",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        print(f"📈 {market.upper()} Futures:")
        print(f"   💰 Current Price: ${data['price']:.2f}")
        print(f"   📊 Volume: {data['volume']:,}")
        print(f"   ⏰ Last Updated: {data['timestamp']}")
        
        return data
    
    def get_historical_data(self, market: str, days: int = 30) -> pd.DataFrame:
        """Get historical futures data"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        params = {
            'market': market,
            'from': start_date.isoformat(),
            'to': end_date.isoformat(),
            'limit': 1000
        }
        
        response = requests.get(
            f"{self.base_url}/futures/historical",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        df = pd.DataFrame(data['results'])
        
        print(f"📊 Retrieved {len(df)} historical records for {market.upper()}")
        return df

# Usage Example
api = EnergyFuturesAPI('your-api-key')

# Get current Henry Hub natural gas prices
current_ng = api.get_current_futures('henry-hub', '2024-03')

# Get 30 days of WTI crude oil history
wti_history = api.get_historical_data('wti', days=30)
print(f"WTI Price Range: ${wti_history['price'].min():.2f} - ${wti_history['price'].max():.2f}")`,
          javascript: `// Professional Energy Futures API Client
class EnergyFuturesAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getCurrentFutures(market, contract = null) {
    const params = new URLSearchParams({ market });
    if (contract) params.append('contract', contract);

    try {
      const response = await fetch(
        \`\${this.baseURL}/futures?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`📈 \${market.toUpperCase()} Futures:\`);
      console.log(\`   💰 Current Price: $\${data.price.toFixed(2)}\`);
      console.log(\`   📊 Volume: \${data.volume.toLocaleString()}\`);
      console.log(\`   ⏰ Last Updated: \${data.timestamp}\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching futures data:', error);
      throw error;
    }
  }

  async getHistoricalData(market, days = 30) {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const params = new URLSearchParams({
      market,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
      limit: '1000'
    });

    try {
      const response = await fetch(
        \`\${this.baseURL}/futures/historical?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      console.log(\`📊 Retrieved \${data.results.length} historical records for \${market.toUpperCase()}\`);
      
      return data.results;
    } catch (error) {
      console.error('❌ Error fetching historical data:', error);
      throw error;
    }
  }
}

// Usage Example
const api = new EnergyFuturesAPI('your-api-key');

// Get current Henry Hub natural gas prices
api.getCurrentFutures('henry-hub', '2024-03')
  .then(data => console.log('Current futures data:', data));

// Get 30 days of WTI crude oil history
api.getHistoricalData('wti', 30)
  .then(history => {
    const prices = history.map(record => record.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    console.log(\`WTI Price Range: $\${minPrice.toFixed(2)} - $\${maxPrice.toFixed(2)}\`);
  });`,
          ruby: `require 'net/http'
require 'json'
require 'uri'
require 'date'

# Professional Energy Futures API Client
class EnergyFuturesAPI
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def get_current_futures(market, contract = nil)
    params = { market: market }
    params[:contract] = contract if contract
    
    uri = URI("#{BASE_URL}/futures")
    uri.query = URI.encode_www_form(params)
    
    response = make_request(uri)
    
    if response.is_a?(Hash)
      puts "📈 #{market.upcase} Futures:"
      puts "   💰 Current Price: $#{response['price']}"
      puts "   📊 Volume: #{response['volume'].to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse}"
      puts "   ⏰ Last Updated: #{response['timestamp']}"
    end
    
    response
  end

  def get_historical_data(market, days = 30)
    end_date = Date.today
    start_date = end_date - days
    
    params = {
      market: market,
      from: start_date.iso8601,
      to: end_date.iso8601,
      limit: 1000
    }
    
    uri = URI("#{BASE_URL}/futures/historical")
    uri.query = URI.encode_www_form(params)
    
    response = make_request(uri)
    
    if response.is_a?(Hash) && response['results']
      puts "📊 Retrieved #{response['results'].length} historical records for #{market.upcase}"
      return response['results']
    end
    
    []
  end

  private

  def make_request(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Get.new(uri)
    @headers.each { |key, value| request[key] = value }

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Request error: #{e.message}"
      nil
    end
  end
end

# Usage Example
api = EnergyFuturesAPI.new('your-api-key')

# Get current Henry Hub natural gas prices
current_ng = api.get_current_futures('henry-hub', '2024-03')

# Get 30 days of WTI crude oil history
wti_history = api.get_historical_data('wti', 30)
if wti_history.any?
  prices = wti_history.map { |record| record['price'] }
  puts "WTI Price Range: $#{prices.min} - $#{prices.max}"
end`,
          curl: `#!/bin/bash

# Professional Energy Futures API Script
API_KEY="${ENERGY_API_KEY:-your-api-key-here}"
BASE_URL="https://api.energy-platform.com/v1"

# Validate API key
if [ -z "$API_KEY" ] || [ "$API_KEY" = "your-api-key-here" ]; then
    echo "❌ Error: Please set your ENERGY_API_KEY environment variable"
    exit 1
fi

# Function to get current futures data
get_current_futures() {
    local market=$1
    local contract=$2
    
    echo "📈 Fetching current $market futures data..."
    
    local url="$BASE_URL/futures?market=$market"
    if [ -n "$contract" ]; then
        url="$url&contract=$contract"
    fi
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$url" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ Success! Current $(echo $market | tr '[:lower:]' '[:upper:]') data:"
        echo "   💰 Price: $(echo $body | jq -r '.price')"
        echo "   📊 Volume: $(echo $body | jq -r '.volume')"
        echo "   ⏰ Updated: $(echo $body | jq -r '.timestamp')"
    else
        echo "❌ Error: HTTP $http_code"
        echo "Response: $body"
    fi
}

# Function to get historical futures data
get_historical_futures() {
    local market=$1
    local days=${2:-30}
    
    echo "📊 Fetching $days days of historical $market data..."
    
    # Calculate date range
    local end_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local start_date=$(date -u -d "$days days ago" +"%Y-%m-%dT%H:%M:%SZ")
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/futures/historical?market=$market&from=$start_date&to=$end_date&limit=1000" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        local count=$(echo $body | jq '.results | length')
        echo "✅ Retrieved $count historical records"
        
        # Show price range
        local min_price=$(echo $body | jq '.results | map(.price) | min')
        local max_price=$(echo $body | jq '.results | map(.price) | max')
        echo "   📈 Price Range: $min_price - $max_price"
    else
        echo "❌ Error: HTTP $http_code"
    fi
}

# Example usage
echo "🚀 EnergyAPI Futures Data Examples"
echo "=================================="

# Get current Henry Hub natural gas futures
get_current_futures "henry-hub" "2024-03"

echo ""

# Get 30 days of WTI crude oil history
get_historical_futures "wti" 30`
        }
      },
    ],
  },
  {
    id: 'ancillary',
    title: 'Ancillary Services',
    content: `
# Ancillary Services

Access ancillary services market data including frequency regulation, spinning reserves, and voltage support services.

## Service Types

### Frequency Regulation
- **RegUp**: Regulation up services
- **RegDown**: Regulation down services  
- **Mileage**: Regulation mileage payments

### Operating Reserves
- **Spinning**: 10-minute spinning reserves
- **Non-Spinning**: 10-minute non-spinning reserves
- **Replacement**: 30-minute replacement reserves

### Voltage Support
- **Reactive Power**: Reactive power services
- **Black Start**: Black start capability services

## Real-time Data

Get live pricing and capacity data for all ancillary service markets across major ISOs.
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import json
from datetime import datetime
from typing import Dict, List, Optional

class AncillaryServicesAPI:
    """Advanced client for Ancillary Services market data"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.energy-platform.com/v1"
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def get_regulation_data(self, iso: str, service_type: str, date: str = None) -> Dict:
        """Get frequency regulation market data"""
        if not date:
            date = datetime.now().strftime('%Y-%m-%d')
            
        payload = {
            "iso": iso,
            "service_type": service_type,
            "date": date
        }
        
        response = requests.post(
            f"{self.base_url}/ancillary/regulation",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"⚡ {iso} {service_type} Regulation Data:")
        print(f"   💰 Clearing Price: ${data['clearing_price']:.2f}/MW")
        print(f"   📊 Capacity: {data['capacity']:,} MW")
        print(f"   🎯 Utilization: {data['utilization']:.1f}%")
        
        return data
    
    def get_reserves_data(self, iso: str, reserve_type: str) -> Dict:
        """Get operating reserves data"""
        params = {
            'iso': iso,
            'reserve_type': reserve_type,
            'real_time': True
        }
        
        response = requests.get(
            f"{self.base_url}/ancillary/reserves",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"🔋 {iso} {reserve_type} Reserves:")
        print(f"   💰 Price: ${data['price']:.2f}/MWh")
        print(f"   📈 Requirement: {data['requirement']:,} MW")
        print(f"   ✅ Available: {data['available']:,} MW")
        
        return data

# Usage Examples
api = AncillaryServicesAPI('your-api-key')

# Get PJM regulation up data
reg_data = api.get_regulation_data('PJM', 'RegUp', '2024-01-15')

# Get ERCOT spinning reserves
reserves = api.get_reserves_data('ERCOT', 'Spinning')

# Get CAISO regulation down
caiso_reg = api.get_regulation_data('CAISO', 'RegDown')`,
          javascript: `// Advanced Ancillary Services API Client
class AncillaryServicesAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getRegulationData(iso, serviceType, date = null) {
    if (!date) {
      date = new Date().toISOString().split('T')[0];
    }

    const payload = {
      iso,
      service_type: serviceType,
      date
    };

    try {
      const response = await fetch(\`\${this.baseURL}/ancillary/regulation\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`⚡ \${iso} \${serviceType} Regulation Data:\`);
      console.log(\`   💰 Clearing Price: $\${data.clearing_price.toFixed(2)}/MW\`);
      console.log(\`   📊 Capacity: \${data.capacity.toLocaleString()} MW\`);
      console.log(\`   🎯 Utilization: \${data.utilization.toFixed(1)}%\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching regulation data:', error);
      throw error;
    }
  }

  async getReservesData(iso, reserveType) {
    const params = new URLSearchParams({
      iso,
      reserve_type: reserveType,
      real_time: 'true'
    });

    try {
      const response = await fetch(
        \`\${this.baseURL}/ancillary/reserves?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🔋 \${iso} \${reserveType} Reserves:\`);
      console.log(\`   💰 Price: $\${data.price.toFixed(2)}/MWh\`);
      console.log(\`   📈 Requirement: \${data.requirement.toLocaleString()} MW\`);
      console.log(\`   ✅ Available: \${data.available.toLocaleString()} MW\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching reserves data:', error);
      throw error;
    }
  }
}

// Usage Examples
const api = new AncillaryServicesAPI('your-api-key');

// Get PJM regulation up data
api.getRegulationData('PJM', 'RegUp', '2024-01-15')
  .then(data => console.log('Regulation data:', data));

// Get ERCOT spinning reserves
api.getReservesData('ERCOT', 'Spinning')
  .then(data => console.log('Reserves data:', data));

// Get multiple markets in parallel
Promise.all([
  api.getRegulationData('CAISO', 'RegDown'),
  api.getReservesData('PJM', 'Non-Spinning'),
  api.getRegulationData('NYISO', 'RegUp')
]).then(results => {
  console.log('📊 Multi-market ancillary services data retrieved!');
});`,
          ruby: `require 'net/http'
require 'json'
require 'uri'
require 'date'

# Advanced Ancillary Services API Client
class AncillaryServicesAPI
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def get_regulation_data(iso, service_type, date = nil)
    date ||= Date.today.strftime('%Y-%m-%d')
    
    payload = {
      iso: iso,
      service_type: service_type,
      date: date
    }
    
    uri = URI("#{BASE_URL}/ancillary/regulation")
    response = make_post_request(uri, payload)
    
    if response
      puts "⚡ #{iso} #{service_type} Regulation Data:"
      puts "   💰 Clearing Price: $#{response['clearing_price']}/MW"
      puts "   📊 Capacity: #{format_number(response['capacity'])} MW"
      puts "   🎯 Utilization: #{response['utilization']}%"
    end
    
    response
  end

  def get_reserves_data(iso, reserve_type)
    params = {
      iso: iso,
      reserve_type: reserve_type,
      real_time: true
    }
    
    uri = URI("#{BASE_URL}/ancillary/reserves")
    uri.query = URI.encode_www_form(params)
    
    response = make_get_request(uri)
    
    if response
      puts "🔋 #{iso} #{reserve_type} Reserves:"
      puts "   💰 Price: $#{response['price']}/MWh"
      puts "   📈 Requirement: #{format_number(response['requirement'])} MW"
      puts "   ✅ Available: #{format_number(response['available'])} MW"
    end
    
    response
  end

  private

  def make_get_request(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Get.new(uri)
    @headers.each { |key, value| request[key] = value }

    execute_request(http, request)
  end

  def make_post_request(uri, payload)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Post.new(uri)
    @headers.each { |key, value| request[key] = value }
    request.body = JSON.dump(payload)

    execute_request(http, request)
  end

  def execute_request(http, request)
    begin
      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Request error: #{e.message}"
      nil
    end
  end

  def format_number(num)
    num.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
  end
end

# Usage Examples
api = AncillaryServicesAPI.new('your-api-key')

puts "🚀 Ancillary Services Market Data"
puts "================================="

# Get PJM regulation up data
reg_data = api.get_regulation_data('PJM', 'RegUp', '2024-01-15')

puts ""

# Get ERCOT spinning reserves
reserves = api.get_reserves_data('ERCOT', 'Spinning')

puts ""

# Get CAISO regulation down
caiso_reg = api.get_regulation_data('CAISO', 'RegDown')`,
          curl: `#!/bin/bash

# Advanced Ancillary Services API Script
API_KEY="${ENERGY_API_KEY:-your-api-key-here}"
BASE_URL="https://api.energy-platform.com/v1"

# Function to get regulation data
get_regulation_data() {
    local iso=$1
    local service_type=$2
    local date=${3:-$(date +%Y-%m-%d)}
    
    echo "⚡ Fetching $iso $service_type regulation data for $date..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X POST "$BASE_URL/ancillary/regulation" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json" \\
        -d "{
            \\"iso\\": \\"$iso\\",
            \\"service_type\\": \\"$service_type\\",
            \\"date\\": \\"$date\\"
        }")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $iso $service_type Data:"
        echo "   💰 Clearing Price: $(echo $body | jq -r '.clearing_price')/MW"
        echo "   📊 Capacity: $(echo $body | jq -r '.capacity') MW"
        echo "   🎯 Utilization: $(echo $body | jq -r '.utilization')%"
    else
        echo "❌ Error: HTTP $http_code"
        echo "Response: $body"
    fi
}

# Function to get reserves data
get_reserves_data() {
    local iso=$1
    local reserve_type=$2
    
    echo "🔋 Fetching $iso $reserve_type reserves data..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/ancillary/reserves?iso=$iso&reserve_type=$reserve_type&real_time=true" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $iso $reserve_type Reserves:"
        echo "   💰 Price: $(echo $body | jq -r '.price')/MWh"
        echo "   📈 Requirement: $(echo $body | jq -r '.requirement') MW"
        echo "   ✅ Available: $(echo $body | jq -r '.available') MW"
    else
        echo "❌ Error: HTTP $http_code"
    fi
}

echo "🚀 Ancillary Services Market Analysis"
echo "====================================="

# Get PJM regulation up data
get_regulation_data "PJM" "RegUp" "2024-01-15"

echo ""

# Get ERCOT spinning reserves
get_reserves_data "ERCOT" "Spinning"

echo ""

# Get CAISO regulation down
get_regulation_data "CAISO" "RegDown"`
        }
      },
    ],
  },
  {
    id: 'rec',
    title: 'Renewable Energy Certificates',
    content: `
# Renewable Energy Certificates (RECs)

Access REC market data, pricing, and trading information across different renewable energy sources and geographic regions.

## REC Types

### Solar RECs (SRECs)
- State-specific solar renewable energy certificates
- Trading prices and volumes
- Compliance market data

### Wind RECs
- Wind-generated renewable energy certificates
- Regional and national markets
- Vintage tracking

### Other Renewable Sources
- Hydro, biomass, geothermal RECs
- Bundled and unbundled certificates
- Voluntary and compliance markets

## Geographic Coverage

- **Northeast**: RGGI states, individual state programs
- **West**: California, Oregon, Washington
- **Midwest**: Illinois, Ohio, Pennsylvania
- **National**: Voluntary markets, federal programs
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional

class RECMarketAPI:
    """Professional client for Renewable Energy Certificate data"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.energy-platform.com/v1"
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def get_srec_pricing(self, state: str, vintage: str = '2024') -> Dict:
        """Get Solar REC pricing for a specific state"""
        params = {
            'state': state,
            'rec_type': 'SREC',
            'vintage': vintage
        }
        
        response = requests.get(
            f"{self.base_url}/recs/pricing",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"☀️ {state} SREC Pricing ({vintage}):")
        print(f"   💰 Current Price: ${data['current_price']:.2f}/MWh")
        print(f"   📈 30-day High: ${data['high_30d']:.2f}")
        print(f"   📉 30-day Low: ${data['low_30d']:.2f}")
        print(f"   📊 Volume: {data['volume']:,} MWh")
        
        return data
    
    def get_trading_volume(self, region: str, rec_type: str, period: str = 'monthly') -> Dict:
        """Get REC trading volume data"""
        params = {
            'region': region,
            'rec_type': rec_type,
            'period': period
        }
        
        response = requests.get(
            f"{self.base_url}/recs/trading-volume",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"🌱 {region} {rec_type.upper()} Trading Volume ({period}):")
        for entry in data['volume_data'][:5]:  # Show top 5
            print(f"   📅 {entry['period']}: {entry['volume']:,} MWh")
        
        return data
    
    def get_compliance_data(self, state: str, year: int = 2024) -> Dict:
        """Get REC compliance requirements and status"""
        params = {
            'state': state,
            'year': year
        }
        
        response = requests.get(
            f"{self.base_url}/recs/compliance",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"📋 {state} REC Compliance ({year}):")
        print(f"   🎯 Requirement: {data['requirement']:,} MWh")
        print(f"   ✅ Retired: {data['retired']:,} MWh")
        print(f"   📊 Compliance Rate: {data['compliance_rate']:.1f}%")
        
        return data

# Usage Examples
api = RECMarketAPI('your-api-key')

# Get New Jersey SREC pricing
nj_srecs = api.get_srec_pricing('NJ', '2024')

# Get RGGI wind REC trading volume
wind_volume = api.get_trading_volume('RGGI', 'wind', 'monthly')

# Get California compliance data
ca_compliance = api.get_compliance_data('CA', 2024)`,
          javascript: `// Professional REC Market API Client
class RECMarketAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getSRECPricing(state, vintage = '2024') {
    const params = new URLSearchParams({
      state,
      rec_type: 'SREC',
      vintage
    });

    try {
      const response = await fetch(
        \`\${this.baseURL}/recs/pricing?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`☀️ \${state} SREC Pricing (\${vintage}):\`);
      console.log(\`   💰 Current Price: $\${data.current_price.toFixed(2)}/MWh\`);
      console.log(\`   📈 30-day High: $\${data.high_30d.toFixed(2)}\`);
      console.log(\`   📉 30-day Low: $\${data.low_30d.toFixed(2)}\`);
      console.log(\`   📊 Volume: \${data.volume.toLocaleString()} MWh\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching SREC pricing:', error);
      throw error;
    }
  }

  async getTradingVolume(region, recType, period = 'monthly') {
    const params = new URLSearchParams({
      region,
      rec_type: recType,
      period
    });

    try {
      const response = await fetch(
        \`\${this.baseURL}/recs/trading-volume?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🌱 \${region} \${recType.toUpperCase()} Trading Volume (\${period}):\`);
      data.volume_data.slice(0, 5).forEach(entry => {
        console.log(\`   📅 \${entry.period}: \${entry.volume.toLocaleString()} MWh\`);
      });
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching trading volume:', error);
      throw error;
    }
  }

  async getComplianceData(state, year = 2024) {
    const params = new URLSearchParams({
      state,
      year: year.toString()
    });

    try {
      const response = await fetch(
        \`\${this.baseURL}/recs/compliance?\${params}\`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`📋 \${state} REC Compliance (\${year}):\`);
      console.log(\`   🎯 Requirement: \${data.requirement.toLocaleString()} MWh\`);
      console.log(\`   ✅ Retired: \${data.retired.toLocaleString()} MWh\`);
      console.log(\`   📊 Compliance Rate: \${data.compliance_rate.toFixed(1)}%\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching compliance data:', error);
      throw error;
    }
  }
}

// Usage Examples
const api = new RECMarketAPI('your-api-key');

// Get New Jersey SREC pricing
api.getSRECPricing('NJ', '2024')
  .then(data => console.log('SREC data retrieved:', data));

// Get RGGI wind REC trading volume
api.getTradingVolume('RGGI', 'wind', 'monthly')
  .then(data => console.log('Trading volume data:', data));

// Get multiple state compliance data
Promise.all([
  api.getComplianceData('CA', 2024),
  api.getComplianceData('NY', 2024),
  api.getComplianceData('TX', 2024)
]).then(results => {
  console.log('📊 Multi-state compliance data retrieved!');
});`,
          ruby: `require 'net/http'
require 'json'
require 'uri'
require 'date'

# Professional REC Market API Client
class RECMarketAPI
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def get_srec_pricing(state, vintage = '2024')
    params = {
      state: state,
      rec_type: 'SREC',
      vintage: vintage
    }
    
    uri = URI("#{BASE_URL}/recs/pricing")
    uri.query = URI.encode_www_form(params)
    
    response = make_request(uri)
    
    if response
      puts "☀️ #{state} SREC Pricing (#{vintage}):"
      puts "   💰 Current Price: $#{response['current_price']}/MWh"
      puts "   📈 30-day High: $#{response['high_30d']}"
      puts "   📉 30-day Low: $#{response['low_30d']}"
      puts "   📊 Volume: #{format_number(response['volume'])} MWh"
    end
    
    response
  end

  def get_trading_volume(region, rec_type, period = 'monthly')
    params = {
      region: region,
      rec_type: rec_type,
      period: period
    }
    
    uri = URI("#{BASE_URL}/recs/trading-volume")
    uri.query = URI.encode_www_form(params)
    
    response = make_request(uri)
    
    if response && response['volume_data']
      puts "🌱 #{region} #{rec_type.upcase} Trading Volume (#{period}):"
      response['volume_data'].first(5).each do |entry|
        puts "   📅 #{entry['period']}: #{format_number(entry['volume'])} MWh"
      end
    end
    
    response
  end

  def get_compliance_data(state, year = 2024)
    params = {
      state: state,
      year: year
    }
    
    uri = URI("#{BASE_URL}/recs/compliance")
    uri.query = URI.encode_www_form(params)
    
    response = make_request(uri)
    
    if response
      puts "📋 #{state} REC Compliance (#{year}):"
      puts "   🎯 Requirement: #{format_number(response['requirement'])} MWh"
      puts "   ✅ Retired: #{format_number(response['retired'])} MWh"
      puts "   📊 Compliance Rate: #{response['compliance_rate']}%"
    end
    
    response
  end

  private

  def make_request(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Get.new(uri)
    @headers.each { |key, value| request[key] = value }

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Request error: #{e.message}"
      nil
    end
  end

  def format_number(num)
    num.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
  end
end

# Usage Examples
api = RECMarketAPI.new('your-api-key')

puts "🚀 REC Market Data Analysis"
puts "=========================="

# Get New Jersey SREC pricing
nj_srecs = api.get_srec_pricing('NJ', '2024')

puts ""

# Get RGGI wind REC trading volume
wind_volume = api.get_trading_volume('RGGI', 'wind', 'monthly')

puts ""

# Get California compliance data
ca_compliance = api.get_compliance_data('CA', 2024)`,
          curl: `#!/bin/bash

# Professional REC Market API Script
API_KEY="${ENERGY_API_KEY:-your-api-key-here}"
BASE_URL="https://api.energy-platform.com/v1"

# Function to get SREC pricing
get_srec_pricing() {
    local state=$1
    local vintage=${2:-2024}
    
    echo "☀️ Fetching $state SREC pricing for vintage $vintage..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/recs/pricing?state=$state&rec_type=SREC&vintage=$vintage" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $state SREC Pricing ($vintage):"
        echo "   💰 Current Price: $(echo $body | jq -r '.current_price')/MWh"
        echo "   📈 30-day High: $(echo $body | jq -r '.high_30d')"
        echo "   📉 30-day Low: $(echo $body | jq -r '.low_30d')"
        echo "   📊 Volume: $(echo $body | jq -r '.volume') MWh"
    else
        echo "❌ Error: HTTP $http_code"
        echo "Response: $body"
    fi
}

# Function to get trading volume
get_trading_volume() {
    local region=$1
    local rec_type=$2
    local period=${3:-monthly}
    
    echo "🌱 Fetching $region $rec_type REC trading volume ($period)..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/recs/trading-volume?region=$region&rec_type=$rec_type&period=$period" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $region $(echo $rec_type | tr '[:lower:]' '[:upper:]') Trading Volume:"
        echo $body | jq -r '.volume_data[:5][] | "   📅 \\(.period): \\(.volume) MWh"'
    else
        echo "❌ Error: HTTP $http_code"
    fi
}

# Function to get compliance data
get_compliance_data() {
    local state=$1
    local year=${2:-2024}
    
    echo "📋 Fetching $state REC compliance data for $year..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X GET "$BASE_URL/recs/compliance?state=$state&year=$year" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $state REC Compliance ($year):"
        echo "   🎯 Requirement: $(echo $body | jq -r '.requirement') MWh"
        echo "   ✅ Retired: $(echo $body | jq -r '.retired') MWh"
        echo "   📊 Compliance Rate: $(echo $body | jq -r '.compliance_rate')%"
    else
        echo "❌ Error: HTTP $http_code"
    fi
}

echo "🚀 REC Market Data Analysis"
echo "=========================="

# Get New Jersey SREC pricing
get_srec_pricing "NJ" "2024"

echo ""

# Get RGGI wind REC trading volume
get_trading_volume "RGGI" "wind" "monthly"

echo ""

# Get California compliance data
get_compliance_data "CA" "2024"`
        }
      },
    ],
  },
  {
    id: 'utility-price',
    title: 'Utility Pricing',
    content: `
# Utility Pricing

Access comprehensive utility rate data, tariff structures, and pricing information for residential, commercial, and industrial customers.

## Rate Types

### Residential Rates
- Basic service rates
- Time-of-use pricing
- Tiered rate structures
- Net metering rates

### Commercial Rates
- Demand charges
- Energy charges  
- Power factor adjustments
- Seasonal variations

### Industrial Rates
- Large customer tariffs
- Interruptible service rates
- Real-time pricing options
- Custom contract rates

## Geographic Coverage

- All 50 US states
- Major Canadian provinces
- 3,000+ utility companies
- Real-time rate updates
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import json
from datetime import datetime
from typing import Dict, List, Optional

class UtilityPricingAPI:
    """Professional client for Utility Pricing data"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.energy-platform.com/v1"
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def get_residential_rates(self, utility_id: str, state: str, rate_schedule: str) -> Dict:
        """Get residential utility rates"""
        payload = {
            "utility_id": utility_id,
            "state": state,
            "rate_schedule": rate_schedule
        }
        
        response = requests.post(
            f"{self.base_url}/utility-pricing/residential",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"🏠 {utility_id} Residential Rates ({rate_schedule}):")
        print(f"   ⚡ Energy Rate: ${data['energy_rate']:.4f}/kWh")
        print(f"   🔌 Basic Charge: ${data['basic_charge']:.2f}/month")
        
        if 'tier_rates' in data:
            print("   📊 Tiered Rates:")
            for tier in data['tier_rates']:
                print(f"      Tier {tier['tier']}: ${tier['rate']:.4f}/kWh (up to {tier['limit']} kWh)")
        
        return data
    
    def get_commercial_rates(self, utility_id: str, state: str, rate_class: str = 'small') -> Dict:
        """Get commercial utility rates"""
        payload = {
            "utility_id": utility_id,
            "state": state,
            "rate_class": rate_class
        }
        
        response = requests.post(
            f"{self.base_url}/utility-pricing/commercial",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"🏢 {utility_id} Commercial Rates ({rate_class}):")
        print(f"   ⚡ Energy Rate: ${data['energy_rate']:.4f}/kWh")
        print(f"   🔋 Demand Charge: ${data['demand_charge']:.2f}/kW")
        print(f"   📅 Customer Charge: ${data['customer_charge']:.2f}/month")
        
        return data
    
    def calculate_bill(self, utility_id: str, state: str, usage_kwh: float, 
                      demand_kw: float = 0, customer_type: str = 'residential') -> Dict:
        """Calculate estimated utility bill"""
        payload = {
            "utility_id": utility_id,
            "state": state,
            "usage_kwh": usage_kwh,
            "demand_kw": demand_kw,
            "customer_type": customer_type
        }
        
        response = requests.post(
            f"{self.base_url}/utility-pricing/calculate",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        
        data = response.json()
        
        print(f"🧾 Bill Calculation for {utility_id}:")
        print(f"   ⚡ Energy Charges: ${data['energy_charges']:.2f}")
        if data.get('demand_charges', 0) > 0:
            print(f"   🔋 Demand Charges: ${data['demand_charges']:.2f}")
        print(f"   📋 Fixed Charges: ${data['fixed_charges']:.2f}")
        print(f"   💰 Total Bill: ${data['total_bill']:.2f}")
        
        return data

# Usage Examples
api = UtilityPricingAPI('your-api-key')

# Get PG&E residential rates
pge_rates = api.get_residential_rates('PGE', 'CA', 'E-1')

# Get commercial rates
commercial_rates = api.get_commercial_rates('PGE', 'CA', 'small')

# Calculate a sample bill
bill = api.calculate_bill('PGE', 'CA', usage_kwh=800, customer_type='residential')`,
          javascript: `// Professional Utility Pricing API Client
class UtilityPricingAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getResidentialRates(utilityId, state, rateSchedule) {
    const payload = {
      utility_id: utilityId,
      state,
      rate_schedule: rateSchedule
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/residential\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🏠 \${utilityId} Residential Rates (\${rateSchedule}):\`);
      console.log(\`   ⚡ Energy Rate: $\${data.energy_rate.toFixed(4)}/kWh\`);
      console.log(\`   🔌 Basic Charge: $\${data.basic_charge.toFixed(2)}/month\`);
      
      if (data.tier_rates) {
        console.log('   📊 Tiered Rates:');
        data.tier_rates.forEach(tier => {
          console.log(\`      Tier \${tier.tier}: $\${tier.rate.toFixed(4)}/kWh (up to \${tier.limit} kWh)\`);
        });
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching residential rates:', error);
      throw error;
    }
  }

  async getCommercialRates(utilityId, state, rateClass = 'small') {
    const payload = {
      utility_id: utilityId,
      state,
      rate_class: rateClass
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/commercial\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🏢 \${utilityId} Commercial Rates (\${rateClass}):\`);
      console.log(\`   ⚡ Energy Rate: $\${data.energy_rate.toFixed(4)}/kWh\`);
      console.log(\`   🔋 Demand Charge: $\${data.demand_charge.toFixed(2)}/kW\`);
      console.log(\`   📅 Customer Charge: $\${data.customer_charge.toFixed(2)}/month\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching commercial rates:', error);
      throw error;
    }
  }

  async calculateBill(utilityId, state, usageKwh, demandKw = 0, customerType = 'residential') {
    const payload = {
      utility_id: utilityId,
      state,
      usage_kwh: usageKwh,
      demand_kw: demandKw,
      customer_type: customerType
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/calculate\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🧾 Bill Calculation for \${utilityId}:\`);
      console.log(\`   ⚡ Energy Charges: $\${data.energy_charges.toFixed(2)}\`);
      if (data.demand_charges > 0) {
        console.log(\`   🔋 Demand Charges: $\${data.demand_charges.toFixed(2)}\`);
      }
      console.log(\`   📋 Fixed Charges: $\${data.fixed_charges.toFixed(2)}\`);
      console.log(\`   💰 Total Bill: $\${data.total_bill.toFixed(2)}\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error calculating bill:', error);
      throw error;
    }
  }
}

// Usage Examples
const api = new UtilityPricingAPI('your-api-key');

// Get PG&E residential rates
api.getResidentialRates('PGE', 'CA', 'E-1')
  .then(rates => console.log('Residential rates:', rates));

// Get commercial rates
api.getCommercialRates('PGE', 'CA', 'small')
  .then(rates => console.log('Commercial rates:', rates));

// Calculate sample bills
api.calculateBill('PGE', 'CA', 800, 0, 'residential')
  .then(bill => console.log('Calculated bill:', bill));`,
          ruby: `require 'net/http'
require 'json'
require 'uri'

# Professional Utility Pricing API Client
class UtilityPricingAPI
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def get_residential_rates(utility_id, state, rate_schedule)
    payload = {
      utility_id: utility_id,
      state: state,
      rate_schedule: rate_schedule
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/residential")
    response = make_post_request(uri, payload)
    
    if response
      puts "🏠 #{utility_id} Residential Rates (#{rate_schedule}):"
      puts "   ⚡ Energy Rate: $#{response['energy_rate']}/kWh"
      puts "   🔌 Basic Charge: $#{response['basic_charge']}/month"
      
      if response['tier_rates']
        puts "   📊 Tiered Rates:"
        response['tier_rates'].each do |tier|
          puts "      Tier #{tier['tier']}: $#{tier['rate']}/kWh (up to #{tier['limit']} kWh)"
        end
      end
    end
    
    response
  end

  def get_commercial_rates(utility_id, state, rate_class = 'small')
    payload = {
      utility_id: utility_id,
      state: state,
      rate_class: rate_class
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/commercial")
    response = make_post_request(uri, payload)
    
    if response
      puts "🏢 #{utility_id} Commercial Rates (#{rate_class}):"
      puts "   ⚡ Energy Rate: $#{response['energy_rate']}/kWh"
      puts "   🔋 Demand Charge: $#{response['demand_charge']}/kW"
      puts "   📅 Customer Charge: $#{response['customer_charge']}/month"
    end
    
    response
  end

  def calculate_bill(utility_id, state, usage_kwh, demand_kw = 0, customer_type = 'residential')
    payload = {
      utility_id: utility_id,
      state: state,
      usage_kwh: usage_kwh,
      demand_kw: demand_kw,
      customer_type: customer_type
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/calculate")
    response = make_post_request(uri, payload)
    
    if response
      puts "🧾 Bill Calculation for #{utility_id}:"
      puts "   ⚡ Energy Charges: $#{response['energy_charges']}"
      puts "   🔋 Demand Charges: $#{response['demand_charges']}" if response['demand_charges'] > 0
      puts "   📋 Fixed Charges: $#{response['fixed_charges']}"
      puts "   💰 Total Bill: $#{response['total_bill']}"
    end
    
    response
  end

  private

  def make_post_request(uri, payload)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Post.new(uri)
    @headers.each { |key, value| request[key] = value }
    request.body = JSON.dump(payload)

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Request error: #{e.message}"
      nil
    end
  end
end

# Usage Examples
api = UtilityPricingAPI.new('your-api-key')

puts "🚀 Utility Pricing Analysis"
puts "=========================="

# Get PG&E residential rates
pge_rates = api.get_residential_rates('PGE', 'CA', 'E-1')

puts ""

# Get commercial rates
commercial_rates = api.get_commercial_rates('PGE', 'CA', 'small')

puts ""

# Calculate sample bills
bill = api.calculate_bill('PGE', 'CA', 800, 0, 'residential')`,
          javascript: `// Professional Utility Pricing API Client
class UtilityPricingAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async getResidentialRates(utilityId, state, rateSchedule) {
    const payload = {
      utility_id: utilityId,
      state,
      rate_schedule: rateSchedule
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/residential\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🏠 \${utilityId} Residential Rates (\${rateSchedule}):\`);
      console.log(\`   ⚡ Energy Rate: $\${data.energy_rate.toFixed(4)}/kWh\`);
      console.log(\`   🔌 Basic Charge: $\${data.basic_charge.toFixed(2)}/month\`);
      
      if (data.tier_rates) {
        console.log('   📊 Tiered Rates:');
        data.tier_rates.forEach(tier => {
          console.log(\`      Tier \${tier.tier}: $\${tier.rate.toFixed(4)}/kWh (up to \${tier.limit} kWh)\`);
        });
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching residential rates:', error);
      throw error;
    }
  }

  async getCommercialRates(utilityId, state, rateClass = 'small') {
    const payload = {
      utility_id: utilityId,
      state,
      rate_class: rateClass
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/commercial\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🏢 \${utilityId} Commercial Rates (\${rateClass}):\`);
      console.log(\`   ⚡ Energy Rate: $\${data.energy_rate.toFixed(4)}/kWh\`);
      console.log(\`   🔋 Demand Charge: $\${data.demand_charge.toFixed(2)}/kW\`);
      console.log(\`   📅 Customer Charge: $\${data.customer_charge.toFixed(2)}/month\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching commercial rates:', error);
      throw error;
    }
  }

  async calculateBill(utilityId, state, usageKwh, demandKw = 0, customerType = 'residential') {
    const payload = {
      utility_id: utilityId,
      state,
      usage_kwh: usageKwh,
      demand_kw: demandKw,
      customer_type: customerType
    };

    try {
      const response = await fetch(\`\${this.baseURL}/utility-pricing/calculate\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log(\`🧾 Bill Calculation for \${utilityId}:\`);
      console.log(\`   ⚡ Energy Charges: $\${data.energy_charges.toFixed(2)}\`);
      if (data.demand_charges > 0) {
        console.log(\`   🔋 Demand Charges: $\${data.demand_charges.toFixed(2)}\`);
      }
      console.log(\`   📋 Fixed Charges: $\${data.fixed_charges.toFixed(2)}\`);
      console.log(\`   💰 Total Bill: $\${data.total_bill.toFixed(2)}\`);
      
      return data;
    } catch (error) {
      console.error('❌ Error calculating bill:', error);
      throw error;
    }
  }
}

// Usage Examples
const api = new UtilityPricingAPI('your-api-key');

// Get PG&E residential rates
api.getResidentialRates('PGE', 'CA', 'E-1')
  .then(rates => console.log('Residential rates:', rates));

// Get commercial rates
api.getCommercialRates('PGE', 'CA', 'small')
  .then(rates => console.log('Commercial rates:', rates));

// Calculate multiple bill scenarios
const scenarios = [
  { usage: 500, type: 'residential' },
  { usage: 800, type: 'residential' },
  { usage: 1200, type: 'residential' }
];

Promise.all(
  scenarios.map(scenario => 
    api.calculateBill('PGE', 'CA', scenario.usage, 0, scenario.type)
  )
).then(bills => {
  console.log('📊 Bill comparison complete!');
  bills.forEach((bill, index) => {
    console.log(\`Scenario \${index + 1}: $\${bill.total_bill.toFixed(2)}\`);
  });
});`,
          ruby: `require 'net/http'
require 'json'
require 'uri'

# Professional Utility Pricing API Client
class UtilityPricingAPI
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def get_residential_rates(utility_id, state, rate_schedule)
    payload = {
      utility_id: utility_id,
      state: state,
      rate_schedule: rate_schedule
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/residential")
    response = make_post_request(uri, payload)
    
    if response
      puts "🏠 #{utility_id} Residential Rates (#{rate_schedule}):"
      puts "   ⚡ Energy Rate: $#{response['energy_rate']}/kWh"
      puts "   🔌 Basic Charge: $#{response['basic_charge']}/month"
      
      if response['tier_rates']
        puts "   📊 Tiered Rates:"
        response['tier_rates'].each do |tier|
          puts "      Tier #{tier['tier']}: $#{tier['rate']}/kWh (up to #{tier['limit']} kWh)"
        end
      end
    end
    
    response
  end

  def get_commercial_rates(utility_id, state, rate_class = 'small')
    payload = {
      utility_id: utility_id,
      state: state,
      rate_class: rate_class
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/commercial")
    response = make_post_request(uri, payload)
    
    if response
      puts "🏢 #{utility_id} Commercial Rates (#{rate_class}):"
      puts "   ⚡ Energy Rate: $#{response['energy_rate']}/kWh"
      puts "   🔋 Demand Charge: $#{response['demand_charge']}/kW"
      puts "   📅 Customer Charge: $#{response['customer_charge']}/month"
    end
    
    response
  end

  def calculate_bill(utility_id, state, usage_kwh, demand_kw = 0, customer_type = 'residential')
    payload = {
      utility_id: utility_id,
      state: state,
      usage_kwh: usage_kwh,
      demand_kw: demand_kw,
      customer_type: customer_type
    }
    
    uri = URI("#{BASE_URL}/utility-pricing/calculate")
    response = make_post_request(uri, payload)
    
    if response
      puts "🧾 Bill Calculation for #{utility_id}:"
      puts "   ⚡ Energy Charges: $#{response['energy_charges']}"
      puts "   🔋 Demand Charges: $#{response['demand_charges']}" if response['demand_charges'] > 0
      puts "   📋 Fixed Charges: $#{response['fixed_charges']}"
      puts "   💰 Total Bill: $#{response['total_bill']}"
    end
    
    response
  end

  private

  def make_post_request(uri, payload)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 30

    request = Net::HTTP::Post.new(uri)
    @headers.each { |key, value| request[key] = value }
    request.body = JSON.dump(payload)

    begin
      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        puts "❌ Error: HTTP #{response.code} - #{response.message}"
        nil
      end
      
    rescue StandardError => e
      puts "❌ Request error: #{e.message}"
      nil
    end
  end
end

# Usage Examples
api = UtilityPricingAPI.new('your-api-key')

puts "🚀 Utility Pricing Analysis"
puts "=========================="

# Get PG&E residential rates
pge_rates = api.get_residential_rates('PGE', 'CA', 'E-1')

puts ""

# Get commercial rates
commercial_rates = api.get_commercial_rates('PGE', 'CA', 'small')

puts ""

# Calculate sample bills for different usage levels
[500, 800, 1200].each_with_index do |usage, index|
  puts "Scenario #{index + 1}: #{usage} kWh"
  bill = api.calculate_bill('PGE', 'CA', usage, 0, 'residential')
  puts ""
end`,
          curl: `#!/bin/bash

# Professional Utility Pricing API Script
API_KEY="${ENERGY_API_KEY:-your-api-key-here}"
BASE_URL="https://api.energy-platform.com/v1"

# Function to get residential rates
get_residential_rates() {
    local utility_id=$1
    local state=$2
    local rate_schedule=$3
    
    echo "🏠 Fetching $utility_id residential rates ($rate_schedule)..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X POST "$BASE_URL/utility-pricing/residential" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json" \\
        -d "{
            \\"utility_id\\": \\"$utility_id\\",
            \\"state\\": \\"$state\\",
            \\"rate_schedule\\": \\"$rate_schedule\\"
        }")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ $utility_id Residential Rates ($rate_schedule):"
        echo "   ⚡ Energy Rate: $(echo $body | jq -r '.energy_rate')/kWh"
        echo "   🔌 Basic Charge: $(echo $body | jq -r '.basic_charge')/month"
        
        # Check for tiered rates
        if echo $body | jq -e '.tier_rates' > /dev/null; then
            echo "   📊 Tiered Rates:"
            echo $body | jq -r '.tier_rates[] | "      Tier \\(.tier): $\\(.rate)/kWh (up to \\(.limit) kWh)"'
        fi
    else
        echo "❌ Error: HTTP $http_code"
        echo "Response: $body"
    fi
}

# Function to calculate utility bill
calculate_bill() {
    local utility_id=$1
    local state=$2
    local usage_kwh=$3
    local customer_type=${4:-residential}
    
    echo "🧾 Calculating bill for $utility_id ($usage_kwh kWh)..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \\
        -X POST "$BASE_URL/utility-pricing/calculate" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json" \\
        -d "{
            \\"utility_id\\": \\"$utility_id\\",
            \\"state\\": \\"$state\\",
            \\"usage_kwh\\": $usage_kwh,
            \\"demand_kw\\": 0,
            \\"customer_type\\": \\"$customer_type\\"
        }")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ Bill Calculation for $utility_id:"
        echo "   ⚡ Energy Charges: $(echo $body | jq -r '.energy_charges')"
        echo "   📋 Fixed Charges: $(echo $body | jq -r '.fixed_charges')"
        echo "   💰 Total Bill: $(echo $body | jq -r '.total_bill')"
    else
        echo "❌ Error: HTTP $http_code"
    fi
}

echo "🚀 Utility Pricing Analysis"
echo "=========================="

# Get PG&E residential rates
get_residential_rates "PGE" "CA" "E-1"

echo ""

# Calculate bills for different usage levels
for usage in 500 800 1200; do
    echo "Scenario: $usage kWh usage"
    calculate_bill "PGE" "CA" $usage "residential"
    echo ""
done`
        }
      },
    ],
  },
  {
    id: 'support',
    title: 'Support & Resources',
    content: `
# Support & Resources

Get help with integration, troubleshooting, and best practices for using the EnergyAPI platform.

## Contact Information

### Technical Support
- **Email**: [developers@energy-platform.com](mailto:developers@energy-platform.com)
- **Response Time**: Within 24 hours
- **Hours**: Monday-Friday, 9 AM - 6 PM EST

### Sales & Partnerships
- **Email**: [sales@energy-platform.com](mailto:sales@energy-platform.com)
- **Phone**: +1 (555) 123-4567

## Resources

### Documentation
- **API Reference**: Complete endpoint documentation
- **SDKs**: Official libraries for Python, JavaScript, and Ruby
- **Tutorials**: Step-by-step integration guides
- **Changelog**: Latest updates and version history

### Community
- **GitHub**: Open source examples and community contributions
- **Stack Overflow**: Tag your questions with \`energy-api\`
- **Discord**: Join our developer community for real-time help

## Status Page

Monitor API uptime and performance at [status.energy-platform.com](https://status.energy-platform.com)

## Rate Limit Information

If you're hitting rate limits, contact our sales team to discuss upgrading your plan or custom enterprise solutions.
    `,
    codeExamples: [
      {
        languages: {
          python: `import requests
import json
from datetime import datetime

class EnergyAPISupportTools:
    """Support and diagnostic tools for EnergyAPI"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.energy-platform.com/v1"
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def check_api_status(self) -> Dict:
        """Check overall API health and status"""
        try:
            response = requests.get(
                f"{self.base_url}/status",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            
            data = response.json()
            
            print("🔍 API Status Check:")
            print(f"   ✅ Status: {data.get('status', 'Unknown')}")
            print(f"   📊 Version: {data.get('version', 'N/A')}")
            print(f"   ⏰ Uptime: {data.get('uptime', 'N/A')}")
            print(f"   🌐 Region: {data.get('region', 'N/A')}")
            
            return data
            
        except requests.exceptions.RequestException as e:
            print(f"❌ API Status Check Failed: {e}")
            return {}
    
    def get_account_usage(self) -> Dict:
        """Get current account usage and limits"""
        try:
            response = requests.get(
                f"{self.base_url}/account/usage",
                headers=self.headers
            )
            response.raise_for_status()
            
            data = response.json()
            
            print("📊 Account Usage Summary:")
            print(f"   🔢 Requests Used: {data.get('requests_used', 0):,}")
            print(f"   📈 Monthly Limit: {data.get('monthly_limit', 0):,}")
            print(f"   📉 Remaining: {data.get('requests_remaining', 0):,}")
            print(f"   📅 Reset Date: {data.get('reset_date', 'N/A')}")
            
            # Calculate usage percentage
            if data.get('monthly_limit', 0) > 0:
                usage_pct = (data.get('requests_used', 0) / data.get('monthly_limit', 1)) * 100
                print(f"   📊 Usage: {usage_pct:.1f}%")
            
            return data
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Usage Check Failed: {e}")
            return {}
    
    def test_all_endpoints(self) -> Dict:
        """Test connectivity to all major endpoints"""
        endpoints = [
            '/status',
            '/futures',
            '/ancillary/regulation',
            '/recs/pricing',
            '/utility-pricing/residential'
        ]
        
        results = {}
        print("🧪 Testing All Endpoints:")
        
        for endpoint in endpoints:
            try:
                response = requests.get(
                    f"{self.base_url}{endpoint}",
                    headers=self.headers,
                    timeout=5
                )
                
                status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
                results[endpoint] = response.status_code
                print(f"   {endpoint}: {status}")
                
            except requests.exceptions.RequestException as e:
                results[endpoint] = f"Error: {e}"
                print(f"   {endpoint}: ❌ Error")
        
        return results

# Usage Examples
support = EnergyAPISupportTools('your-api-key')

print("🚀 EnergyAPI Support Diagnostics")
print("================================")

# Check API status
status = support.check_api_status()

print("")

# Check account usage
usage = support.get_account_usage()

print("")

# Test all endpoints
endpoint_tests = support.test_all_endpoints()`,
          javascript: `// EnergyAPI Support and Diagnostic Tools
class EnergyAPISupportTools {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async checkAPIStatus() {
    try {
      const response = await fetch(\`\${this.baseURL}/status\`, {
        headers: this.headers,
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log('🔍 API Status Check:');
      console.log(\`   ✅ Status: \${data.status || 'Unknown'}\`);
      console.log(\`   📊 Version: \${data.version || 'N/A'}\`);
      console.log(\`   ⏰ Uptime: \${data.uptime || 'N/A'}\`);
      console.log(\`   🌐 Region: \${data.region || 'N/A'}\`);
      
      return data;
    } catch (error) {
      console.error('❌ API Status Check Failed:', error);
      return {};
    }
  }

  async getAccountUsage() {
    try {
      const response = await fetch(\`\${this.baseURL}/account/usage\`, {
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log('📊 Account Usage Summary:');
      console.log(\`   🔢 Requests Used: \${(data.requests_used || 0).toLocaleString()}\`);
      console.log(\`   📈 Monthly Limit: \${(data.monthly_limit || 0).toLocaleString()}\`);
      console.log(\`   📉 Remaining: \${(data.requests_remaining || 0).toLocaleString()}\`);
      console.log(\`   📅 Reset Date: \${data.reset_date || 'N/A'}\`);
      
      // Calculate usage percentage
      if (data.monthly_limit > 0) {
        const usagePct = ((data.requests_used || 0) / data.monthly_limit) * 100;
        console.log(\`   📊 Usage: \${usagePct.toFixed(1)}%\`);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Usage Check Failed:', error);
      return {};
    }
  }

  async testAllEndpoints() {
    const endpoints = [
      '/status',
      '/futures',
      '/ancillary/regulation',
      '/recs/pricing',
      '/utility-pricing/residential'
    ];
    
    const results = {};
    console.log('🧪 Testing All Endpoints:');
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          headers: this.headers,
          signal: AbortSignal.timeout(5000)
        });
        
        const status = response.ok ? '✅ OK' : \`❌ \${response.status}\`;
        results[endpoint] = response.status;
        console.log(\`   \${endpoint}: \${status}\`);
        
      } catch (error) {
        results[endpoint] = \`Error: \${error.message}\`;
        console.log(\`   \${endpoint}: ❌ Error\`);
      }
    }
    
    return results;
  }

  async generateSupportReport() {
    console.log('📋 Generating Support Report...');
    console.log('================================');
    
    const [status, usage, endpointTests] = await Promise.all([
      this.checkAPIStatus(),
      this.getAccountUsage(),
      this.testAllEndpoints()
    ]);
    
    const report = {
      timestamp: new Date().toISOString(),
      api_status: status,
      account_usage: usage,
      endpoint_tests: endpointTests
    };
    
    console.log('\\n📄 Support Report Generated!');
    console.log('Include this information when contacting support:');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  }
}

// Usage Examples
const support = new EnergyAPISupportTools('your-api-key');

console.log('🚀 EnergyAPI Support Diagnostics');
console.log('================================');

// Run comprehensive diagnostics
support.generateSupportReport()
  .then(report => {
    console.log('✅ Diagnostics complete!');
  })
  .catch(error => {
    console.error('❌ Diagnostics failed:', error);
  });`,
          ruby: `require 'net/http'
require 'json'
require 'uri'
require 'timeout'

# EnergyAPI Support and Diagnostic Tools
class EnergyAPISupportTools
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def check_api_status
    begin
      uri = URI("#{BASE_URL}/status")
      response = make_request_with_timeout(uri, 10)
      
      if response
        puts "🔍 API Status Check:"
        puts "   ✅ Status: #{response['status'] || 'Unknown'}"
        puts "   📊 Version: #{response['version'] || 'N/A'}"
        puts "   ⏰ Uptime: #{response['uptime'] || 'N/A'}"
        puts "   🌐 Region: #{response['region'] || 'N/A'}"
      end
      
      response || {}
    rescue StandardError => e
      puts "❌ API Status Check Failed: #{e.message}"
      {}
    end
  end

  def get_account_usage
    begin
      uri = URI("#{BASE_URL}/account/usage")
      response = make_request_with_timeout(uri, 10)
      
      if response
        puts "📊 Account Usage Summary:"
        puts "   🔢 Requests Used: #{format_number(response['requests_used'] || 0)}"
        puts "   📈 Monthly Limit: #{format_number(response['monthly_limit'] || 0)}"
        puts "   📉 Remaining: #{format_number(response['requests_remaining'] || 0)}"
        puts "   📅 Reset Date: #{response['reset_date'] || 'N/A'}"
        
        # Calculate usage percentage
        if (response['monthly_limit'] || 0) > 0
          usage_pct = ((response['requests_used'] || 0).to_f / response['monthly_limit']) * 100
          puts "   📊 Usage: #{usage_pct.round(1)}%"
        end
      end
      
      response || {}
    rescue StandardError => e
      puts "❌ Usage Check Failed: #{e.message}"
      {}
    end
  end

  def test_all_endpoints
    endpoints = [
      '/status',
      '/futures',
      '/ancillary/regulation',
      '/recs/pricing',
      '/utility-pricing/residential'
    ]
    
    results = {}
    puts "🧪 Testing All Endpoints:"
    
    endpoints.each do |endpoint|
      begin
        uri = URI("#{BASE_URL}#{endpoint}")
        response = make_request_with_timeout(uri, 5)
        
        status = response ? '✅ OK' : '❌ Error'
        results[endpoint] = response ? 200 : 'Error'
        puts "   #{endpoint}: #{status}"
        
      rescue StandardError => e
        results[endpoint] = "Error: #{e.message}"
        puts "   #{endpoint}: ❌ Error"
      end
    end
    
    results
  end

  def generate_support_report
    puts "📋 Generating Support Report..."
    puts "================================"
    
    status = check_api_status
    puts ""
    
    usage = get_account_usage
    puts ""
    
    endpoint_tests = test_all_endpoints
    
    report = {
      timestamp: Time.now.iso8601,
      api_status: status,
      account_usage: usage,
      endpoint_tests: endpoint_tests
    }
    
    puts ""
    puts "📄 Support Report Generated!"
    puts "Include this information when contacting support:"
    puts JSON.pretty_generate(report)
    
    report
  end

  private

  def make_request_with_timeout(uri, timeout_seconds)
    Timeout::timeout(timeout_seconds) do
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.read_timeout = timeout_seconds

      request = Net::HTTP::Get.new(uri)
      @headers.each { |key, value| request[key] = value }

      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        nil
      end
    end
  rescue Timeout::Error
    puts "   ⏰ Request timed out"
    nil
  end

  def format_number(num)
    num.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
  end
end

# Usage Examples
support = EnergyAPISupportTools.new('your-api-key')

puts "🚀 EnergyAPI Support Diagnostics"
puts "================================"

# Generate comprehensive support report
report = support.generate_support_report`,
          javascript: `// EnergyAPI Support and Diagnostic Tools
class EnergyAPISupportTools {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.energy-platform.com/v1';
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async checkAPIStatus() {
    try {
      const response = await fetch(\`\${this.baseURL}/status\`, {
        headers: this.headers,
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log('🔍 API Status Check:');
      console.log(\`   ✅ Status: \${data.status || 'Unknown'}\`);
      console.log(\`   📊 Version: \${data.version || 'N/A'}\`);
      console.log(\`   ⏰ Uptime: \${data.uptime || 'N/A'}\`);
      console.log(\`   🌐 Region: \${data.region || 'N/A'}\`);
      
      return data;
    } catch (error) {
      console.error('❌ API Status Check Failed:', error);
      return {};
    }
  }

  async getAccountUsage() {
    try {
      const response = await fetch(\`\${this.baseURL}/account/usage\`, {
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      
      console.log('📊 Account Usage Summary:');
      console.log(\`   🔢 Requests Used: \${(data.requests_used || 0).toLocaleString()}\`);
      console.log(\`   📈 Monthly Limit: \${(data.monthly_limit || 0).toLocaleString()}\`);
      console.log(\`   📉 Remaining: \${(data.requests_remaining || 0).toLocaleString()}\`);
      console.log(\`   📅 Reset Date: \${data.reset_date || 'N/A'}\`);
      
      // Calculate usage percentage
      if (data.monthly_limit > 0) {
        const usagePct = ((data.requests_used || 0) / data.monthly_limit) * 100;
        console.log(\`   📊 Usage: \${usagePct.toFixed(1)}%\`);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Usage Check Failed:', error);
      return {};
    }
  }

  async testAllEndpoints() {
    const endpoints = [
      '/status',
      '/futures',
      '/ancillary/regulation',
      '/recs/pricing',
      '/utility-pricing/residential'
    ];
    
    const results = {};
    console.log('🧪 Testing All Endpoints:');
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          headers: this.headers,
          signal: AbortSignal.timeout(5000)
        });
        
        const status = response.ok ? '✅ OK' : \`❌ \${response.status}\`;
        results[endpoint] = response.status;
        console.log(\`   \${endpoint}: \${status}\`);
        
      } catch (error) {
        results[endpoint] = \`Error: \${error.message}\`;
        console.log(\`   \${endpoint}: ❌ Error\`);
      }
    }
    
    return results;
  }

  async generateSupportReport() {
    console.log('📋 Generating Support Report...');
    console.log('================================');
    
    const [status, usage, endpointTests] = await Promise.all([
      this.checkAPIStatus(),
      this.getAccountUsage(),
      this.testAllEndpoints()
    ]);
    
    const report = {
      timestamp: new Date().toISOString(),
      api_status: status,
      account_usage: usage,
      endpoint_tests: endpointTests,
      user_agent: navigator.userAgent,
      browser_info: {
        language: navigator.language,
        platform: navigator.platform,
        online: navigator.onLine
      }
    };
    
    console.log('\\n📄 Support Report Generated!');
    console.log('Include this information when contacting support:');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  }

  async downloadSupportReport() {
    const report = await this.generateSupportReport();
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`energy-api-support-report-\${new Date().toISOString().split('T')[0]}.json\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('💾 Support report downloaded!');
  }
}

// Usage Examples
const support = new EnergyAPISupportTools('your-api-key');

console.log('🚀 EnergyAPI Support Diagnostics');
console.log('================================');

// Run comprehensive diagnostics
support.generateSupportReport()
  .then(report => {
    console.log('✅ Diagnostics complete!');
    
    // Optionally download the report
    // support.downloadSupportReport();
  })
  .catch(error => {
    console.error('❌ Diagnostics failed:', error);
  });`,
          ruby: `require 'net/http'
require 'json'
require 'uri'
require 'timeout'

# EnergyAPI Support and Diagnostic Tools
class EnergyAPISupportTools
  BASE_URL = 'https://api.energy-platform.com/v1'
  
  def initialize(api_key)
    raise ArgumentError, 'API key is required' if api_key.nil? || api_key.empty?
    
    @api_key = api_key
    @headers = {
      'X-API-Key' => api_key,
      'Content-Type' => 'application/json',
      'User-Agent' => 'EnergyAPI-Ruby-Client/1.0'
    }
  end

  def check_api_status
    begin
      uri = URI("#{BASE_URL}/status")
      response = make_request_with_timeout(uri, 10)
      
      if response
        puts "🔍 API Status Check:"
        puts "   ✅ Status: #{response['status'] || 'Unknown'}"
        puts "   📊 Version: #{response['version'] || 'N/A'}"
        puts "   ⏰ Uptime: #{response['uptime'] || 'N/A'}"
        puts "   🌐 Region: #{response['region'] || 'N/A'}"
      end
      
      response || {}
    rescue StandardError => e
      puts "❌ API Status Check Failed: #{e.message}"
      {}
    end
  end

  def get_account_usage
    begin
      uri = URI("#{BASE_URL}/account/usage")
      response = make_request_with_timeout(uri, 10)
      
      if response
        puts "📊 Account Usage Summary:"
        puts "   🔢 Requests Used: #{format_number(response['requests_used'] || 0)}"
        puts "   📈 Monthly Limit: #{format_number(response['monthly_limit'] || 0)}"
        puts "   📉 Remaining: #{format_number(response['requests_remaining'] || 0)}"
        puts "   📅 Reset Date: #{response['reset_date'] || 'N/A'}"
        
        # Calculate usage percentage
        if (response['monthly_limit'] || 0) > 0
          usage_pct = ((response['requests_used'] || 0).to_f / response['monthly_limit']) * 100
          puts "   📊 Usage: #{usage_pct.round(1)}%"
        end
      end
      
      response || {}
    rescue StandardError => e
      puts "❌ Usage Check Failed: #{e.message}"
      {}
    end
  end

  def test_all_endpoints
    endpoints = [
      '/status',
      '/futures',
      '/ancillary/regulation',
      '/recs/pricing',
      '/utility-pricing/residential'
    ]
    
    results = {}
    puts "🧪 Testing All Endpoints:"
    
    endpoints.each do |endpoint|
      begin
        uri = URI("#{BASE_URL}#{endpoint}")
        response = make_request_with_timeout(uri, 5)
        
        status = response ? '✅ OK' : '❌ Error'
        results[endpoint] = response ? 200 : 'Error'
        puts "   #{endpoint}: #{status}"
        
      rescue StandardError => e
        results[endpoint] = "Error: #{e.message}"
        puts "   #{endpoint}: ❌ Error"
      end
    end
    
    results
  end

  def generate_support_report
    puts "📋 Generating Support Report..."
    puts "================================"
    
    status = check_api_status
    puts ""
    
    usage = get_account_usage
    puts ""
    
    endpoint_tests = test_all_endpoints
    
    report = {
      timestamp: Time.now.iso8601,
      api_status: status,
      account_usage: usage,
      endpoint_tests: endpoint_tests,
      ruby_version: RUBY_VERSION,
      platform: RUBY_PLATFORM
    }
    
    puts ""
    puts "📄 Support Report Generated!"
    puts "Include this information when contacting support:"
    puts JSON.pretty_generate(report)
    
    report
  end

  private

  def make_request_with_timeout(uri, timeout_seconds)
    Timeout::timeout(timeout_seconds) do
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.read_timeout = timeout_seconds

      request = Net::HTTP::Get.new(uri)
      @headers.each { |key, value| request[key] = value }

      response = http.request(request)
      
      case response.code
      when '200'
        JSON.parse(response.body)
      else
        nil
      end
    end
  rescue Timeout::Error
    puts "   ⏰ Request timed out"
    nil
  end

  def format_number(num)
    num.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
  end
end

# Usage Examples
support = EnergyAPISupportTools.new('your-api-key')

puts "🚀 EnergyAPI Support Diagnostics"
puts "================================"

# Generate comprehensive support report
report = support.generate_support_report

puts ""
puts "✅ Diagnostics complete!"
puts "📧 Email this report to developers@energy-platform.com for support"`,
          curl: `#!/bin/bash

# EnergyAPI Support and Diagnostic Tools
API_KEY="${ENERGY_API_KEY:-your-api-key-here}"
BASE_URL="https://api.energy-platform.com/v1"

# Function to check API status
check_api_status() {
    echo "🔍 Checking API status..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" --max-time 10 \\
        -X GET "$BASE_URL/status" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ API Status Check:"
        echo "   ✅ Status: $(echo $body | jq -r '.status // "Unknown"')"
        echo "   📊 Version: $(echo $body | jq -r '.version // "N/A"')"
        echo "   ⏰ Uptime: $(echo $body | jq -r '.uptime // "N/A"')"
        echo "   🌐 Region: $(echo $body | jq -r '.region // "N/A"')"
    else
        echo "❌ API Status Check Failed: HTTP $http_code"
    fi
}

# Function to get account usage
get_account_usage() {
    echo "📊 Checking account usage..."
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" --max-time 10 \\
        -X GET "$BASE_URL/account/usage" \\
        -H "X-API-Key: $API_KEY" \\
        -H "Content-Type: application/json")
    
    http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')
    
    if [ $http_code -eq 200 ]; then
        echo "✅ Account Usage Summary:"
        echo "   🔢 Requests Used: $(echo $body | jq -r '.requests_used // 0')"
        echo "   📈 Monthly Limit: $(echo $body | jq -r '.monthly_limit // 0')"
        echo "   📉 Remaining: $(echo $body | jq -r '.requests_remaining // 0')"
        echo "   📅 Reset Date: $(echo $body | jq -r '.reset_date // "N/A"')"
        
        # Calculate usage percentage
        local used=$(echo $body | jq -r '.requests_used // 0')
        local limit=$(echo $body | jq -r '.monthly_limit // 1')
        if [ $limit -gt 0 ]; then
            local usage_pct=$(echo "scale=1; ($used * 100) / $limit" | bc -l)
            echo "   📊 Usage: ${usage_pct}%"
        fi
    else
        echo "❌ Usage Check Failed: HTTP $http_code"
    fi
}

# Function to test all endpoints
test_all_endpoints() {
    echo "🧪 Testing All Endpoints:"
    
    local endpoints=(
        "/status"
        "/futures"
        "/ancillary/regulation"
        "/recs/pricing"
        "/utility-pricing/residential"
    )
    
    for endpoint in "\${endpoints[@]}"; do
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" --max-time 5 \\
            -X GET "$BASE_URL$endpoint" \\
            -H "X-API-Key: $API_KEY" \\
            -H "Content-Type: application/json")
        
        http_code=$(echo $response | tr -d '\\n' | sed -e 's/.*HTTPSTATUS://')
        
        if [ $http_code -eq 200 ]; then
            echo "   $endpoint: ✅ OK"
        else
            echo "   $endpoint: ❌ Error (HTTP $http_code)"
        fi
    done
}

# Function to generate support report
generate_support_report() {
    echo "📋 Generating Support Report..."
    echo "================================"
    
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local report_file="energy-api-support-report-$(date +%Y%m%d).json"
    
    echo "{"
    echo "  \\"timestamp\\": \\"$timestamp\\","
    echo "  \\"system_info\\": {"
    echo "    \\"os\\": \\"$(uname -s)\\","
    echo "    \\"version\\": \\"$(uname -r)\\","
    echo "    \\"curl_version\\": \\"$(curl --version | head -n1)\\""
    echo "  },"
    echo "  \\"diagnostics\\": {"
    
    check_api_status
    echo ""
    
    get_account_usage
    echo ""
    
    test_all_endpoints
    
    echo "  }"
    echo "}"
    
    echo ""
    echo "📄 Support Report Generated!"
    echo "📧 Email this information to developers@energy-platform.com for support"
}

echo "🚀 EnergyAPI Support Diagnostics"
echo "================================"

# Run comprehensive diagnostics
generate_support_report`
        }
      },
    ],
  },
];