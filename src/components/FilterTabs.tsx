import type { FilterTab, Category, SortBy } from '../types';
import { CATEGORIES } from '../types';

type FilterTabsProps = {
  filterTab: FilterTab;
  onFilterTabChange: (tab: FilterTab) => void;
  selectedCategory: Category | '전체';
  onCategoryChange: (cat: Category | '전체') => void;
  sortBy: SortBy;
  onSortByChange: (sort: SortBy) => void;
};

const TABS: FilterTab[] = ['전체', '완료', '미완료'];

function FilterTabs({
  filterTab,
  onFilterTabChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortByChange,
}: FilterTabsProps) {
  return (
    <section style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onFilterTabChange(tab)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: filterTab === tab ? '#333' : '#fff',
              color: filterTab === tab ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: filterTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label>
          카테고리:
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | '전체')}
            style={{ marginLeft: '4px', padding: '4px 8px' }}
          >
            <option value="전체">전체</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          정렬:
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortBy)}
            style={{ marginLeft: '4px', padding: '4px 8px' }}
          >
            <option value="created">생성순</option>
            <option value="priority">우선순위순</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FilterTabs;
