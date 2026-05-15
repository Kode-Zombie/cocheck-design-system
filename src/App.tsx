import {
  Bell,
  Check,
  Download,
  Plus,
  Settings,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import './components/components.css'
import {
  BarGraph,
  DateTimeSelect,
  DiscontinuousInput,
  IconButton,
  MiniProfile,
  SearchInput,
  StandardDataTable,
  TimeInput,
} from './components'
import type { DataTableColumn, DataTableRow } from './components'

type VariantTileProps = {
  title: string
  description?: string
  wide?: boolean
  children: ReactNode
}

function VariantTile({ title, description, wide, children }: VariantTileProps) {
  return (
    <article className={`variant-tile ${wide ? 'variant-tile--wide' : ''}`}>
      <div className="variant-tile__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="variant-tile__body">{children}</div>
    </article>
  )
}

const progressGraphData = [
  { label: '비활성 1', value: 58, status: 'inactive' as const },
  { label: '진행중', value: 65, status: 'progress' as const },
  { label: '비활성 2', value: 86, status: 'inactive' as const },
  { label: '비활성 3', value: 50, status: 'inactive' as const },
  { label: '정보 없음 1', value: null, status: 'empty' as const },
  { label: '정보 없음 2', value: null, status: 'empty' as const },
  { label: '정보 없음 3', value: null, status: 'empty' as const },
]

const activeGraphData = [
  { label: '월', value: 42, status: 'inactive' as const },
  { label: '화', value: 78, status: 'active' as const },
  { label: '수', value: 64, status: 'progress' as const },
  { label: '목', value: 30, status: 'inactive' as const },
  { label: '금', value: null, status: 'empty' as const },
]

const tableRows: DataTableRow[] = [
  {
    id: 'C-001',
    name: 'TimeInput',
    owner: '민아',
    status: 'active',
    statusLabel: '활성',
    score: 92,
  },
  {
    id: 'C-002',
    name: 'SearchInput',
    owner: '준호',
    status: 'waiting',
    statusLabel: '대기',
    score: 78,
  },
  {
    id: 'C-003',
    name: 'StandardDataTable',
    owner: '서연',
    status: 'blocked',
    statusLabel: '차단',
    score: 64,
  },
]

const tableColumns: DataTableColumn[] = [
  { key: 'id', header: 'ID', sortable: true, width: '92px' },
  { key: 'name', header: '컴포넌트', sortable: true },
  { key: 'owner', header: '담당자', sortable: true },
  {
    key: 'status',
    header: '상태',
    render: (row) => (
      <span className={`sb-status sb-status--${String(row.status)}`}>
        {row.statusLabel}
      </span>
    ),
  },
  {
    key: 'score',
    header: '점수',
    align: 'right',
    sortable: true,
    sortValue: (row) => Number(row.score),
  },
]

function App() {
  const [code, setCode] = useState('24')
  const [circleCode, setCircleCode] = useState('A7')
  const [secretCode, setSecretCode] = useState('39')
  const [query, setQuery] = useState('')
  const [compactQuery, setCompactQuery] = useState('디자인')

  return (
    <main className="app-shell">
      <section className="app-hero">
        <p className="app-eyebrow">React + Vite + Storybook</p>
        <h1>컴포넌트 옵션 전시장</h1>
        <p>
          Storybook에서 만든 컴포넌트 예시와 옵션 조합을 메인 화면에서 한 번에
          비교할 수 있도록 정리했습니다.
        </p>
      </section>

      <div className="showcase-layout">
        <section className="showcase-section" aria-labelledby="input-components">
          <div className="showcase-section__header">
            <span>입력 컴포넌트</span>
            <h2 id="input-components">입력값과 선택 상태</h2>
          </div>

          <div className="showcase-grid">
            <VariantTile
              title="TimeInput"
              description="오전 기본값, 오후 기본값, 비활성 상태를 비교합니다."
            >
              <div className="stacked-demo">
                <TimeInput
                  label="출근 시간"
                  defaultValue="09:30"
                  helperText="시간과 분을 직접 입력하세요."
                />
                <TimeInput label="마감 시간" defaultValue="18:45" />
                <TimeInput label="잠긴 시간" defaultValue="22:10" disabled />
              </div>
            </VariantTile>

            <VariantTile
              title="DiscontinuousInput"
              description="사각형, 동그라미, 시크릿 표시 옵션입니다."
            >
              <div className="stacked-demo">
                <DiscontinuousInput
                  label="숫자 코드"
                  length={6}
                  value={code}
                  onChange={setCode}
                  validateCharacter={(character) => /^[0-9]$/.test(character)}
                  helperText={`현재 값: ${code || '비어 있음'}`}
                />
                <DiscontinuousInput
                  label="접근 코드"
                  length={4}
                  shape="circle"
                  value={circleCode}
                  onChange={setCircleCode}
                  validateCharacter={(character) => /^[A-Z0-9]$/i.test(character)}
                />
                <DiscontinuousInput
                  label="시크릿 코드"
                  length={6}
                  shape="circle"
                  opaqueWhenFilled
                  value={secretCode}
                  onChange={setSecretCode}
                  validateCharacter={(character) => /^[0-9]$/.test(character)}
                  helperText="채워진 글자는 화면에서 가립니다."
                />
              </div>
            </VariantTile>

            <VariantTile
              title="SearchInput"
              description="검색 전용 아이콘과 라벨 노출 방식을 확인합니다."
            >
              <div className="stacked-demo">
                <SearchInput
                  label="멤버 검색"
                  placeholder="이름 또는 이메일로 검색"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <SearchInput
                  label="프로젝트 검색"
                  hideLabel
                  placeholder="프로젝트명으로 검색"
                  value={compactQuery}
                  onChange={(event) => setCompactQuery(event.target.value)}
                />
                <SearchInput
                  label="비활성 검색"
                  placeholder="검색할 수 없습니다"
                  disabled
                />
              </div>
            </VariantTile>

            <VariantTile
              title="DateTimeSelect"
              description="타이핑 마스크와 달력 선택을 함께 제공합니다."
            >
              <div className="stacked-demo">
                <DateTimeSelect
                  label="배포 날짜"
                  minYear={2024}
                  maxYear={2028}
                  defaultValue={{ year: 2026, month: 5, day: 12 }}
                  helperText="YYYY-MM-DD로 직접 입력하거나 달력에서 선택하세요."
                />
                <DateTimeSelect
                  label="생일"
                  mode="md"
                  defaultValue={{ month: 9, day: 18 }}
                  helperText="MM-DD 형식으로 입력합니다."
                />
              </div>
            </VariantTile>
          </div>
        </section>

        <section className="showcase-section" aria-labelledby="action-components">
          <div className="showcase-section__header">
            <span>액션 컴포넌트</span>
            <h2 id="action-components">버튼과 프로필</h2>
          </div>

          <div className="showcase-grid showcase-grid--compact">
            <VariantTile
              title="IconButton"
              description="투명, 반투명, 원형 설정을 색상 의도와 조합합니다."
            >
              <div className="button-gallery">
                <IconButton
                  label="추가"
                  icon={<Plus size={16} />}
                  size="sm"
                  shape="circle"
                />
                <IconButton
                  label="확인"
                  icon={<Check size={19} />}
                  variant="primary"
                />
                <IconButton
                  label="다운로드"
                  icon={<Download size={22} />}
                  size="lg"
                  variant="primary"
                  shape="circle"
                />
                <IconButton
                  label="알림"
                  icon={<Bell size={19} />}
                  surface="translucent"
                />
                <IconButton
                  label="설정"
                  icon={<Settings size={19} />}
                  surface="transparent"
                />
                <IconButton
                  label="삭제"
                  icon={<Trash2 size={19} />}
                  variant="danger"
                  surface="translucent"
                />
                <IconButton
                  label="닫기"
                  icon={<X size={16} />}
                  size="sm"
                  variant="danger"
                  surface="transparent"
                  shape="circle"
                />
              </div>
            </VariantTile>

            <VariantTile
              title="MiniProfile"
              description="댓글용, 모바일 앱용, 웹용 사용 맥락으로 구분합니다."
            >
              <div className="profile-gallery">
                <div className="profile-use-case">
                  <span>댓글용</span>
                  <MiniProfile
                    src="https://i.pravatar.cc/128?img=12"
                    name="고중범"
                    subtitle="방금 전 댓글 작성"
                    size="sm"
                  />
                </div>
                <div className="profile-use-case">
                  <span>모바일 앱용</span>
                  <MiniProfile
                    src="https://i.pravatar.cc/128?img=32"
                    name="이진우"
                    subtitle="온라인"
                  />
                </div>
                <div className="profile-use-case">
                  <span>웹용</span>
                  <MiniProfile
                    src="https://i.pravatar.cc/128?img=47"
                    name="이민성"
                    subtitle="프로젝트 리드"
                    size="lg"
                  />
                </div>
              </div>
            </VariantTile>
          </div>
        </section>

        <section className="showcase-section" aria-labelledby="display-components">
          <div className="showcase-section__header">
            <span>표시 컴포넌트</span>
            <h2 id="display-components">데이터와 진행 상태</h2>
          </div>

          <div className="showcase-grid">
            <VariantTile
              title="BarGraph"
              description="비활성, 진행중, 정보 없음 상태를 한 그래프에 표시합니다."
              wide
            >
              <BarGraph max={100} height={210} data={progressGraphData} />
            </VariantTile>

            <VariantTile
              title="BarGraph"
              description="활성 상태와 낮은 높이의 압축형 그래프입니다."
              wide
            >
              <BarGraph max={100} height={170} data={activeGraphData} />
            </VariantTile>

            <VariantTile
              title="StandardDataTable"
              description="정렬 가능한 표와 상태 배지를 포함한 기본 예시입니다."
              wide
            >
              <StandardDataTable
                caption="컴포넌트 준비 상태"
                columns={tableColumns}
                rows={tableRows}
                rowKey={(row) => String(row.id)}
              />
            </VariantTile>

            <VariantTile
              title="StandardDataTable"
              description="데이터가 없을 때의 빈 상태입니다."
              wide
            >
              <StandardDataTable
                caption="대기 중인 컴포넌트"
                columns={tableColumns}
                rows={[]}
                emptyMessage="아직 표시할 데이터가 없습니다."
              />
            </VariantTile>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
