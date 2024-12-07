const BrowseFundraisers = ({ fundraisers }) => {
  return (
    <div className="browse-fundraisers">
      <h2>Fundraisers</h2>
      <div className="fundraiser-list">
        {fundraisers.map((fundraiser, index) => (
          <div key={index} className="fundraiser-card">
            <div className="fundraiser-content">
              <h3>{fundraiser.title}</h3>
              <p className="fundraiser-description">{fundraiser.description}</p>
              <div className="fundraiser-stats">
                <div><strong>Goal: </strong>{fundraiser.goal}</div>
                <div><strong>Raised: </strong>{fundraiser.raised}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseFundraisers;
