import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import VulnerabilityTable from '../components/VulnerabilityTable'
import { useVulnerabilities } from '../hooks/useVulnerabilities'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { vulnerabilities, loading, error } = useVulnerabilities();
  return (
    <div className="App">
      <main style={{ padding: 24 }}>
        {loading && <div>Loading vulnerabilities...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && (
          <VulnerabilityTable vulnerabilities={vulnerabilities} />
        )}
      </main>
    </div>
  )
}
