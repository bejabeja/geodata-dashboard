# GEODATA DASHBOARD
This project is an interactive dashboard that allows politicians and other stakeholders to visualize geospatial data. The goal is to provide a user-friendly interface for non-technical users, enabling informed decision-making based on available geospatial data.

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)


## Description
The Geodata Dashboard presents(by default) bird flu cases over time across various regions of Switzerland.
You can upload your own CSV (latitude and longitude required) to allow users to explore geospatial trends. It has been developed with a focus on interoperability and data reusability, adhering to FAIR and ORD principles.

This dashboard is specifically designed for people with limited technical expertise. The interface is intuitive, making the data easy to understand through clear and accessible visualizations.

## Features
- Interactive map visualization.
- Filtering options based on year.
- Summary of trends.

## Future feature

I have some ideas to improve this project. 
- Line charts showing the temporal evolution of cases.
- Relevant demographic and environmental information.
- Bar chars for additional data representation.
- Predictive analytics to forecast future trends.

I would like to explore the possibility of incorporating predicted future changes. This will require further research to determine the best approach for implementing accurate predictive models.


## Installation

The project is organized into two main folders: `client` and `server`. The `client` folder contains all the frontend logic, while the `server` folder contains all the backend logic.

To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bejabeja/geodata-dashboard.git
   cd geodata-dashboard
   ```


2. First, install all necessary dependencies for both the client and server:

```bash
make install
```

3. Now you can use the Makefile to easily start or stop both the client and server:

- To start both the client and server, run:
```bash
make start
```

- To stop both processes and free the ports, run:
```bash
make stop
```

4. Access the application:

Once both processes are running, you can access the application in your browser at [http://localhost:3000](http://localhost:3000)


The page will reload if you make edits.\
You will also see any lint errors in the console.


# Usage

Once the app is running, users can:

1. View the map that displays geospatial data by year.
2. Interact with the map. When zooming in or out, data is grouped for better visualization by region.
3. Interact with map. Click on map markers to open a pop-up with specific data details.
4. Sidebar. Use the sidebar slider filter option to view data by year.
5. Sidebar. Cards section that provides insights into trends and total cases.
6. Sidebar. When data is non-numerical, a dropdown appears with different related information.

