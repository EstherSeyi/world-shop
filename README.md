This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### How run the development server

Run yarn to install dependencies

```bash
yarn
```

Add a .env file to the root folder with the following ENV variables

```
NEXT_PUBLIC_BASE_URL=''
NEXT_PUBLIC_API_KEY=''
```

Run command to start dev server

```bash
yarn run dev
```

To Run tests

```
yarn run test
```

### Any additional features you implemented:

- Product Detail Page
- Dummy Checkout & Order Confirmation
- API Integration

### My approach to the product, including any design decisions or tradeoﬀs you made

- Design Decisions

1. Adding `amount` to cart data in localStorage: I started off building with a dummy JSON file and implementing the cart feature like a regular ecommerce site. When I started integrating the API with the giftcards I realised some things were different such as pricing, so I decided to also add the amount(denomination) of the giftcard selected by the user to the cart. I made this decision because, I thought it was a good way to have the price included in the cart.

### Ideas I applied to improve the performance of the ﬂipbook

- Caching data fetched
- Using next image to optimize images for different screen sizes
- React performance optimization apis like useMemo to make sure operations are not run more times than necessary.
- Collocation: making sure that state is as close as possible to where it's being used.
- Offline Persistence: Implemented offline persistence such that the app is usable for some time(at least 24hrs) when the user is not connected to their internet.
