function TravelerCard({ traveler }) {
  return (
    <div className="traveler-card">
      <h3>{traveler.name}</h3>

      <p>
        Email: {traveler.email}
      </p>

      <p>
        Phone: {traveler.phone}
      </p>
    </div>
  );
}

export default TravelerCard;