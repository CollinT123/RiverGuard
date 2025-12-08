// RiverGuard Configuration
export const config = {
  // Backend Computer URL (where your ML algorithm runs)
  backendUrl: process.env.BACKEND_COMPUTER_URL || 'http://localhost:8000',
  
  // Optional settings
  maintenanceMode: process.env.MAINTENANCE_MODE === 'true' || false,
  debugMode: process.env.DEBUG_MODE === 'true' || false
}
