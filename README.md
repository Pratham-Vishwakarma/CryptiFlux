# CryptiFlux

CryptiFlux is a decentralized exchange (DEX) application built with React and Ant Design. It allows users to pool and swap tokens seamlessly on the Aptos blockchain. The application supports multiple users, token pooling, and token swapping with a simple and intuitive interface.

## Features

- **Liquidity Pooling:** Users can pool their tokens into the liquidity pool.
- **Token Swapping:** Users can swap tokens with each other through the liquidity pool.
- **User Management:** Supports multiple users with distinct token balances.
- **Responsive UI:** Built with Ant Design for a clean and responsive user interface.

## Tech Stack

- **React:** JavaScript library for building user interfaces.
- **Ant Design:** React UI library for designing aesthetically pleasing and responsive applications.
- **TypeScript:** Superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **Aptos Blockchain:** Secure, scalable, and reliable blockchain for decentralized applications.

## Screenshots

### Home Page

*Include screenshots of the home page here*

### Pool Tokens

*Include screenshots of the pool tokens page here*

### Swap Tokens

*Include screenshots of the swap tokens page here*

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (v6 or later) or [yarn](https://yarnpkg.com/getting-started/install) (v1.22 or later)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/DEXApp.git
    cd DEXApp
    ```
2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm start
    # or
    yarn start
    ```
2. The application should now be running at `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```sh
npm run build
# or
yarn build
```
This will create an optimized build in the `build` directory.

## Usage

1. Initialize the Pool:
   
- Select a user from the dropdown.
- Enter the amounts for Token A and Token B.
- Click the "Pool Token" button to add the tokens to the liquidity pool.

2. Swap Tokens:

- Select a user from the dropdown.
- Enter the amount of tokens to swap and select the token type.
- Click the "Swap Tokens" button to perform the swap.

## Customization

To change the default token amounts or add more users, modify the `users` state in the `CryptiFlux` component.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Aptos BlockChain](https://aptoslabs.com/)
  
## Contact

For any questions or feedback, please contact Pratham Vishwakarma at pratham.vishwakarma125940@gmail.com
