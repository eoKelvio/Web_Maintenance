# Maintenance Management App

This project is a mobile application built with React Native and Expo, designed to manage machine maintenance efficiently. Users can view maintenance history, request maintenance, and track the status of machines in real-time.

## Features

- **User Authentication**: Secure login for users to manage maintenance tasks.
- **Machine Overview**: View details about machines, including status, location, and maintenance history.
- **Maintenance Requests**: Submit requests for maintenance, providing details about the machine and issues encountered.
- **Maintenance Tracking**: Start and finish maintenance sessions, updating machine status accordingly.
- **History Logs**: Access a comprehensive log of past maintenance activities.

## Tech Stack

- **React Native**: Framework for building native apps using React.
- **Expo**: A toolchain for developing React Native applications.
- **TypeScript**: Strongly typed programming language for better code quality.
- **Mock Data**: Simulated data for testing and development purposes.

## Getting Started

To set up and run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/eoKelvio/Web_Maintenance.git
   cd Web_Maitenance/mobile_front
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npx expo start
   ```

4. **Run the application**:
   - You can scan the QR code with your Expo Go app or use an emulator to run the application on your device.

## File Structure

```plaintext
.
├── components             # Reusable UI components
├── data                   # Mock data files
│   ├── mock_items.ts      # Mock items for maintenance
│   ├── mock_machines.ts   # Mock machines data
│   ├── mock_maintenances.ts # Mock maintenance records
│   └── mock_teams.ts      # Mock teams data
├── screens                # Screens for different app functionalities
│   ├── MaintenanceHistory.tsx      # View maintenance history
│   ├── MaintenancePending.tsx      # View pending maintenance tasks
│   ├── MaintenanceRequest.tsx      # Request new maintenance
│   └── MaintenanceRunning.tsx      # View ongoing maintenance
└── App                    # Main application entry point
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
