export interface CardProps {
  title: string;
  imageSrc: string;
  description?: string;
  onClick?: () => void;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface PropertyProps {
  id?: string,
  name: string,
  address: {
    state: string,
    city: string,
    country: string
  },
  rating: number,
  category: string[],
  price: number
  offers: {
    bed: string,
    shower: string,
    occupants: string
  },
  discount: string,
  tags?: string[],
  description?: string,
  images?: string[],
  amenities?: string[],
  bedrooms?: number,
  bathrooms?: number,
  size?: number | string,
}