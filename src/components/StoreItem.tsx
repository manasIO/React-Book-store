import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const inCart = quantity > 0;

  return (
    <Card className="h-100 shadow-sm">
      <div
        className="position-relative overflow-hidden rounded-top"
        style={{ paddingTop: "75%", backgroundColor: "#F4F4F4" }}
      >
        <Card.Img
          variant="top"
          src={imgUrl}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-4 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {inCart ? (
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ gap: "1rem" }}
            >
              <div className="d-flex align-items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => decreaseCartQuantity(id)}
                  disabled={quantity === 1}
                >
                  -
                </Button>
                <div className="mx-2">{quantity}</div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => increaseCartQuantity(id)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
