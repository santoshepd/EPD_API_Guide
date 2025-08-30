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

For technical support, please contact our team at developers@energy-platform.com
    `,
    codeExamples: [
      {
        languages: {
          curl: `curl -X GET "https://api.energy-platform.com/v1/status" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
          python: `import requests

headers = {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.energy-platform.com/v1/status', headers=headers)
data = response.json()`,
          javascript: `const response = await fetch('https://api.energy-platform.com/v1/status', {
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.energy-platform.com/v1/status')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)`
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

api_key = os.getenv('ENERGY_API_KEY')

headers = {
    'X-API-Key': api_key,
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.energy-platform.com/v1/data',
    headers=headers
)

data = response.json()`,
          javascript: `const apiKey = process.env.ENERGY_API_KEY;

const headers = {
  'X-API-Key': apiKey,
  'Content-Type': 'application/json'
};

const response = await fetch('https://api.energy-platform.com/v1/data', {
  headers
});

const data = await response.json();`,
          ruby: `require 'net/http'
require 'json'

api_key = ENV['ENERGY_API_KEY']

uri = URI('https://api.energy-platform.com/v1/data')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = api_key
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)`,
          curl: `curl -X GET "https://api.energy-platform.com/v1/data" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
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

# Get current natural gas futures
params = {
    'market': 'henry-hub',
    'contract': '2024-03'
}

response = requests.get(
    'https://api.energy-platform.com/v1/futures',
    headers={'X-API-Key': 'your-api-key'},
    params=params
)

futures = response.json()`,
          javascript: `// Get current natural gas futures
const response = await fetch('https://api.energy-platform.com/v1/futures?market=henry-hub&contract=2024-03', {
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  }
});

const futures = await response.json();
console.log(futures);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.energy-platform.com/v1/futures')
uri.query = URI.encode_www_form({
  market: 'henry-hub',
  contract: '2024-03'
})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'your-api-key'

response = http.request(request)
futures = JSON.parse(response.body)`,
          curl: `curl -X GET "https://api.energy-platform.com/v1/futures/historical?market=wti&from=2024-01-01&to=2024-01-31" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
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

payload = {
    "iso": "PJM",
    "service_type": "RegUp",
    "date": "2024-01-15"
}

response = requests.post(
    'https://api.energy-platform.com/v1/ancillary/regulation',
    headers={'X-API-Key': 'your-api-key'},
    json=payload
)

regulation_data = response.json()`,
          javascript: `// Get PJM regulation market data
const response = await fetch('https://api.energy-platform.com/v1/ancillary/regulation', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    iso: 'PJM',
    service_type: 'RegUp',
    date: '2024-01-15'
  })
});

const regulationData = await response.json();`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.energy-platform.com/v1/ancillary/regulation')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['X-API-Key'] = 'your-api-key'
request['Content-Type'] = 'application/json'
request.body = JSON.dump({
  iso: 'PJM',
  service_type: 'RegUp',
  date: '2024-01-15'
})

response = http.request(request)
regulation_data = JSON.parse(response.body)`,
          curl: `curl -X POST "https://api.energy-platform.com/v1/ancillary/regulation" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "iso": "PJM",
    "service_type": "RegUp", 
    "date": "2024-01-15"
  }'`
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

params = {
    'state': 'NJ',
    'rec_type': 'SREC',
    'vintage': '2024'
}

response = requests.get(
    'https://api.energy-platform.com/v1/recs/pricing',
    headers={'X-API-Key': 'your-api-key'},
    params=params
)

srec_pricing = response.json()`,
          javascript: `// Get SREC pricing for New Jersey
const response = await fetch('https://api.energy-platform.com/v1/recs/pricing', {
  method: 'GET',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  },
  params: new URLSearchParams({
    state: 'NJ',
    rec_type: 'SREC',
    vintage: '2024'
  })
});

const srecPricing = await response.json();`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.energy-platform.com/v1/recs/pricing')
uri.query = URI.encode_www_form({
  state: 'NJ',
  rec_type: 'SREC',
  vintage: '2024'
})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'your-api-key'

response = http.request(request)
srec_pricing = JSON.parse(response.body)`,
          curl: `curl -X GET "https://api.energy-platform.com/v1/recs/trading-volume?region=RGGI&rec_type=wind&period=monthly" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
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

payload = {
    "utility_id": "PGE",
    "state": "CA",
    "rate_schedule": "E-1"
}

response = requests.post(
    'https://api.energy-platform.com/v1/utility-pricing/residential',
    headers={'X-API-Key': 'your-api-key'},
    json=payload
)

rate_data = response.json()`,
          javascript: `// Get residential rates for a specific utility
const response = await fetch('https://api.energy-platform.com/v1/utility-pricing/residential', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    utility_id: 'PGE',
    state: 'CA',
    rate_schedule: 'E-1'
  })
});

const rateData = await response.json();`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.energy-platform.com/v1/utility-pricing/residential')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['X-API-Key'] = 'your-api-key'
request['Content-Type'] = 'application/json'
request.body = JSON.dump({
  utility_id: 'PGE',
  state: 'CA',
  rate_schedule: 'E-1'
})

response = http.request(request)
rate_data = JSON.parse(response.body)`,
          curl: `curl -X POST "https://api.energy-platform.com/v1/utility-pricing/residential" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "utility_id": "PGE",
    "state": "CA", 
    "rate_schedule": "E-1"
  }'`
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
- **Email**: developers@energy-platform.com
- **Response Time**: Within 24 hours
- **Hours**: Monday-Friday, 9 AM - 6 PM EST

### Sales & Partnerships
- **Email**: sales@energy-platform.com
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
          python: `# Check API status and your current usage
import requests

# Get API status
status_response = requests.get(
    'https://api.energy-platform.com/v1/status',
    headers={'X-API-Key': 'your-api-key'}
)

# Get your account usage
usage_response = requests.get(
    'https://api.energy-platform.com/v1/account/usage',
    headers={'X-API-Key': 'your-api-key'}
)

print(f"API Status: {status_response.json()}")
print(f"Usage: {usage_response.json()}")`,
          javascript: `// Check API status and your current usage
const statusResponse = await fetch('https://api.energy-platform.com/v1/status', {
  headers: { 'X-API-Key': 'your-api-key' }
});

const usageResponse = await fetch('https://api.energy-platform.com/v1/account/usage', {
  headers: { 'X-API-Key': 'your-api-key' }
});

const status = await statusResponse.json();
const usage = await usageResponse.json();

console.log('API Status:', status);
console.log('Usage:', usage);`,
          ruby: `require 'net/http'
require 'json'

def make_request(endpoint)
  uri = URI("https://api.energy-platform.com/v1/#{endpoint}")
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Get.new(uri)
  request['X-API-Key'] = 'your-api-key'
  
  response = http.request(request)
  JSON.parse(response.body)
end

status = make_request('status')
usage = make_request('account/usage')

puts "API Status: #{status}"
puts "Usage: #{usage}"`,
          curl: `# Check API status
curl -X GET "https://api.energy-platform.com/v1/status" \\
  -H "X-API-Key: YOUR_API_KEY"

# Check account usage
curl -X GET "https://api.energy-platform.com/v1/account/usage" \\
  -H "X-API-Key: YOUR_API_KEY"`
        }
      },
    ],
  },
];