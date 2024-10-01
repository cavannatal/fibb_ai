import React, { useEffect, useState } from 'react';
import { Product } from './types';
import { getSignedUrl } from './s3';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getSignedUrl(product.imageUrl);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };
    fetchImageUrl();
  }, [product.imageUrl]);

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />
      <h4>{product.name}</h4>
      <p>Type: {product.type}</p>
      <p>Price: ${product.price}</p>
      <button>View Details</button>
    </div>
  );
};

export default ProductCard;