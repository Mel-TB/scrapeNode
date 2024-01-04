## Ingredients and Additives Scraper

<div align='center'>


<a href='mailto:tramimelinda@gmail.com'>![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)</a> <a href='https://fr.linkedin.com/in/melindat'>![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)</a>

</div>

<br/>

## Table of Contents

<details>

<summary>Table</summary>

- [About the Project](#about-the-project)
- [Implementation Details](#implementation-details)
  - [Features](#features)
- [Installation & Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup Environment](#setup-environment)
- [Usage](#usage)
- [Contributing to the Project](#contributing-to-the-project)
- [License](#license)
   </details>

## About the Project

This project is a Node.js application designed to scrape information about various ingredients and food additives from specificed web sources and store this data in a MongoDB database. It utilizes libraries such as Axios for HTTP request, Cheerio for parsing HTML, and Mongoose for interacting with MongoDB


## Implementation Details

###  Features

- **Web Scraping for Ingredients**: Automates the process of extracting information about various ingredients from the provided URL.
- **Classification and Categorization**: Classifies ingredients into three distinct categories based on their characteristics extracted during scraping.
- **Data Storage in MongoDB**: Utilizes Mongoose, a MongoDB object modeling tool, to store and manage the scraped data efficiently in a MongoDB database.
- **Scraping of Food Additives Information**: Extends the scraping capability to include food additives, capturing essential details like additive number and name.
- **Error Handling and Logging**:  Implements robust error handling mechanisms to manage and log issues encountered during the scraping process.
- **Environment Variable Integration**:  Leverages environment variables for flexible configuration, allowing the user to set MongoDB credentials and scraping URLs without hardcoding them in the source code.

## Installation And Setup

### Prerequisites

- Node.js must be installed on your system.

### Installation

Clone the project and install its dependencies using npm

```sh
git clone https://github.com/Mel-TB/scrapeNode.git
cd scrapeNode
npm install
```

### Setup Environment 

Set up your environment variables in a **.env** file at the root of the project:

```sh
MONGODB_PASSWORD=your_mongodb_password
SCRAPE_URL=your_scrape_url_for_ingredients
SCRAPE_URL_ADDITIVES=your_scrape_url_for_additives
```

## Usage
To run the scraper, execute the following command:

```sh
node index.js
```
This will start the scraping process, and the results will be stored in your MongoDB database. 

## Contributing to the Project
To contribute to this project, follow these steps:

- Fork this repository.
- Create a branch: ```git checkout -b <branch_name>```
- Make your changes and commit them: ``` git commit -m '<commit_message>' ```
- Push to the original branch: ``` git push origin <project_name>/<location> ```
- Create the pull request.
  
Alternatively, see the GitHub documentation on [creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

## License
This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
