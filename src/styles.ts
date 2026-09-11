import styled from 'styled-components'

export const Page = styled.main`
  min-height: 100%;
  padding: 32px 40px 64px;
  background: var(--surface-surface, #fbfbfd);
`

export const PageInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HeaderRow = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`

export const HeaderCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 720px;
`

export const Eyebrow = styled.p`
  margin: 0;
  font-family: var(--page-eyebrow-font-family, "Poppins", sans-serif);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-ink-700, #3a4556);
`

export const Title = styled.h1`
  margin: 0;
  font-family: var(--h3-font-family, "Poppins", sans-serif);
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  color: var(--text-text, #0d1728);
`

export const Subtitle = styled.p`
  margin: 0;
  font-family: var(--body-2-regular-font-family, "DM Sans", sans-serif);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-ink-500, #5e6b7e);
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const InputStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const ResultsStack = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
  border-top: 1px solid var(--border-dominant, #dfdfe6);
`

export const RunBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Card = styled.section`
  background: var(--surface-white-background, rgba(255, 255, 255, 0.92));
  border: 1px solid var(--border-dominant, #dfdfe6);
  border-radius: var(--radius-lg, 16px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

export const CardTitle = styled.h2`
  margin: 0;
  font-family: var(--subtitle-1-font-family, "DM Sans", sans-serif);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: #1a2332;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const MetricField = styled(Field)`
  justify-content: flex-end;
`

export const MetricStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(0, 181, 174, 0.08);
  border: 1px solid rgba(0, 181, 174, 0.16);
`

export const MetricStripWarn = styled(MetricStrip)`
  background: rgba(255, 127, 80, 0.08);
  border-color: rgba(255, 127, 80, 0.2);
`

export const MetricLabel = styled.span`
  font-family: var(--metric-label-font-family, "Roboto Mono", monospace);
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: var(--text-ink-500, #5e6b7e);
`

export const MetricValue = styled.span`
  font-family: var(--h3-font-family, "Poppins", sans-serif);
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  color: var(--text-text, #0d1728);
`

export const RecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const RecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

export const RecValue = styled.div`
  font-family: var(--body-2-regular-font-family, "DM Sans", sans-serif);
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #1a2332;
`

export const WhyBox = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(0, 181, 174, 0.08);
  border: 1px solid rgba(0, 181, 174, 0.18);
  font-family: var(--body-2-regular-font-family, "DM Sans", sans-serif);
  font-size: 14px;
  line-height: 20px;
  color: #1a2332;
`

export const EmptyRec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-height: 168px;
  padding: 8px 0;
`

export const ErrorBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 127, 80, 0.1);
  border: 1px solid rgba(255, 127, 80, 0.24);
  color: #1a2332;
  font-family: var(--body-2-regular-font-family, "DM Sans", sans-serif);
  font-size: 14px;
  line-height: 20px;
`

export const TableToolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const TableActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 104px;
  align-items: center;

  > :last-child {
    width: 104px;
    display: flex;
    justify-content: center;
  }
`

export const AlignedTable = styled.div<{ $columns: number }>`
  width: 100%;

  .table-header,
  .table-row {
    display: grid !important;
    grid-template-columns: ${(props) =>
      props.$columns === 7
        ? 'minmax(140px, 1.3fr) minmax(90px, 1fr) minmax(110px, 1.1fr) minmax(100px, 1fr) minmax(110px, 1.1fr) 88px 104px'
        : 'minmax(140px, 1.3fr) minmax(90px, 1fr) minmax(110px, 1.1fr) minmax(110px, 1.1fr) 88px 104px'};
    width: 100% !important;
    box-sizing: border-box;
    align-items: center;
  }

  .table-header > div,
  .table-row > .row-cell {
    flex: unset !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    box-sizing: border-box;
    display: flex !important;
    align-items: center;
  }

  .table-header > div:nth-last-child(-n + 2),
  .table-row > .row-cell:nth-last-child(-n + 2) {
    justify-content: center;
    text-align: center;
  }

  .table-header > div:nth-last-child(-n + 2) > div {
    justify-content: center !important;
    text-align: center !important;
    width: 100%;
  }

  .table-row > .row-cell:last-child {
    justify-content: center;
  }

  .table-header .sort-icon,
  .table-header svg {
    display: none !important;
  }
`
