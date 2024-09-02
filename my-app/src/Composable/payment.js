import { loadStripe } from "@stripe/stripe-js";
import { onMounted, ref } from "vue";

let stripe = null;
let elements = null;

export default function setupPayment() {
  const loading = ref(true);

  onMounted(async () => {
    const ELEMENT_TYPE = "card";
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
    elements = stripe.elements();
    const element = elements.create(ELEMENT_TYPE);
    element.mount("#stripe-element-mount-point");
    loading.value = false;
  });

  function redirect() {
    stripe.redirectToCheckout({
      successUrl: "https://busca-pet-seven.vercel.app/success",
      cancelUrl: "https://busca-pet-seven.vercel.app/",
      lineItems: [
        {
          price: "price_1PuBUaKaU1Vv323oO1K4iWIH",
          quantity: 1
        }
      ],
      mode: "subscription"
    });
  }

  return { redirect, loading };
}
