import "./Pages.css";

function About() {
    return (
        <div className = "page">
            <h2>About StreamList</h2>
            <p>StreamList is a Progressive Web App designed to assist users manage their favorite streaming services, discover popular movies, and organize subscription purchases through an intuitive interface.</p>

            <p>The application combines data from multiple sources, including The Movie Database (TMDb) API and locally managed subscription products. Users can browse movies, manage subscriptions, adjust cat quantities, and maintain their personalized watchlists through persistent local storage.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Movie Discovery through TMDb API</li>
                <li>Subscription Management System</li>
                <li>Shopping cart with quantity adjustment</li>
                <li>Persistent Local Storage support</li>
                <li>Responsive Design</li>
                <li>Progressive Web App (PWA) capabilities</li>
                <li>Protected Routes for secure access</li>
                <li>Credit Card Form for Subscription Management</li>
            </ul>

            <h3>Technology Used</h3>
            <ul>
                <li>React for UI Development</li>
                <li>React Router for Navigation</li>
                <li>TMDb API for Movie Data</li>
                <li>Local Storage for Data Persistence</li>
                <li>Progressive Web App (PWA) Technology</li>
                <li>CSS for Styling</li>
                <li>JavaScript for Interactivity</li>
            </ul>

            <h3>Future Enhancements</h3>
            <p>Future versions of StreamList may include personalized movie recommendations, cloud synchronization, and enhanced offline functionality.</p>
        </div>
    );
}

export default About;