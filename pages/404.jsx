import Body from '/components/body.jsx';

export default function ErrorPage() {
    return (
        <Body title="404">
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-7xl font-extrabold mb-4">404</h1>
                <h2 className="text-3xl">That did not go as planned</h2>
            </div>
        </Body>
    );
}
