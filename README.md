# Petshop API

## Overview

The **Petshop API** is a RESTful API designed to manage pet-related data, including information about users, cats, breeds, and vaccines. Below are explanations of possible flows within the application:

## Unauthenticated User Flow

An unauthenticated user can request data from the server, such as information about registered users and cats in the system. Data can be paginated, sorted and filtered.

## Authenticated User Flow

Once registered and/or logged in, a user can perform additional actions:

- **Add Cats**: Authenticated users can add their own cats to the server, providing details such as name, breed, birthdate, and age.

- **Manage Breeds**: Each cat has a breed, and the list of breeds is defined by logged-in users. Users cannot define breed objects unless they have an account and are logged in.

- **Vaccination**: Cats can be vaccinated, and the list of available vaccines follows the same rules as the breed list. Users can only define vaccines if they are logged in.
