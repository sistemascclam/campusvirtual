export default function handler(req, res) {
    res.status(200).json({ id: 1, name: 'J Smith', email: 'jsmith@example.com' })
}