export const listProducts = `
  query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        price
        imageUrl
        featured
      }
      nextToken
    }
  }
`;

export const createProduct = `
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      type
      price
      imageUrl
      featured
    }
  }
`;