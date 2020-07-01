import React from "react";
import { useParams } from "react-router-dom";

export default function TargetedSearch() {
  const { slug } = useParams();

  return <div>slug: {slug}</div>;
}
