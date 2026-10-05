import PackageCard from "./PackageCard";

function PackageList({ packages }) {
  if (packages.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        No travel packages available.
      </p>
    );
  }

  return (
    <div className="package-list">
      {packages.map((packageData) => (
        <PackageCard
          key={packageData.id}
          packageData={packageData}
        />
      ))}
    </div>
  );
}

export default PackageList;