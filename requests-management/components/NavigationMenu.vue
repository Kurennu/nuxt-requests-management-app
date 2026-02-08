<script setup lang="ts">
  const { getItem, setItem } = useLocalStorage()
  const SIDEBAR_STATE_KEY = 'sidebar_collapsed'

  const isCollapsed = ref<boolean>(getItem<boolean>(SIDEBAR_STATE_KEY) ?? false)

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
    setItem(SIDEBAR_STATE_KEY, isCollapsed.value)
  }
</script>

<template>
  <aside :class="[$style.aside, { [$style.collapsed]: isCollapsed }]">
    <div :class="$style.header">
      <button
          :class="$style.switch"
          @click="toggleSidebar"
          :aria-label="isCollapsed ? 'Развернуть меню' : 'Свернуть меню'"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ [$style.rotated]: isCollapsed }">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1211 4.19978C13.3652 4.44386 13.3652 4.83959 13.1211 5.08367L8.20468 10.0001L13.1211 14.9164C13.3652 15.1605 13.3652 15.5563 13.1211 15.8003C12.877 16.0444 12.4813 16.0444 12.2372 15.8003L6.87886 10.442C6.76165 10.3248 6.6958 10.1658 6.6958 10.0001C6.6958 9.8343 6.76165 9.67532 6.87886 9.55812L12.2372 4.19978C12.4813 3.9557 12.877 3.9557 13.1211 4.19978Z" fill="#A7A5A5"/>
        </svg>
      </button>
    </div>
    <ul :class="$style.list">
      <li :class="[$style.item, $style['is-active']]">
        <span :class="$style.icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.90914 5.45455C6.10561 5.45455 5.45441 6.1058 5.45441 6.9094V8.36416C5.45441 9.16776 6.10561 9.81901 6.90914 9.81901H8.36376C9.16729 9.81901 9.81848 9.16776 9.81848 8.36416V6.9094C9.81848 6.1058 9.16729 5.45455 8.36376 5.45455H6.90914ZM4 6.9094C4 5.30248 5.30236 4 6.90914 4H8.36376C9.97054 4 11.2729 5.30248 11.2729 6.9094V8.36416C11.2729 9.97108 9.97054 11.2736 8.36376 11.2736H6.90914C5.30236 11.2736 4 9.97108 4 8.36416V6.9094ZM15.6362 5.45455C14.8327 5.45455 14.1815 6.1058 14.1815 6.9094V8.36416C14.1815 9.16776 14.8327 9.81901 15.6362 9.81901H17.0909C17.8944 9.81901 18.5456 9.16776 18.5456 8.36416V6.9094C18.5456 6.1058 17.8944 5.45455 17.0909 5.45455H15.6362ZM12.7271 6.9094C12.7271 5.30248 14.0295 4 15.6362 4H17.0909C18.6976 4 20 5.30248 20 6.9094V8.36416C20 9.97108 18.6976 11.2736 17.0909 11.2736H15.6362C14.0295 11.2736 12.7271 9.97108 12.7271 8.36416V6.9094ZM6.90914 14.181C6.10561 14.181 5.45441 14.8322 5.45441 15.6358V17.0906C5.45441 17.8942 6.10561 18.5455 6.90914 18.5455H8.36376C9.16729 18.5455 9.81848 17.8942 9.81848 17.0906V15.6358C9.81848 14.8322 9.16729 14.181 8.36376 14.181H6.90914ZM4 15.6358C4 14.0289 5.30236 12.7264 6.90914 12.7264H8.36376C9.97054 12.7264 11.2729 14.0289 11.2729 15.6358V17.0906C11.2729 18.6975 9.97054 20 8.36376 20H6.90914C5.30236 20 4 18.6975 4 17.0906V15.6358ZM15.6362 14.181C14.8327 14.181 14.1815 14.8322 14.1815 15.6358V17.0906C14.1815 17.8942 14.8327 18.5455 15.6362 18.5455H17.0909C17.8944 18.5455 18.5456 17.8942 18.5456 17.0906V15.6358C18.5456 14.8322 17.8944 14.181 17.0909 14.181H15.6362ZM12.7271 15.6358C12.7271 14.0289 14.0295 12.7264 15.6362 12.7264H17.0909C18.6976 12.7264 20 14.0289 20 15.6358V17.0906C20 18.6975 18.6976 20 17.0909 20H15.6362C14.0295 20 12.7271 18.6975 12.7271 17.0906V15.6358Z" fill="#FC8507"/>
          </svg>
        </span>
        <span v-show="!isCollapsed" :class="$style.title">
          Заявки
        </span>
      </li>
    </ul>
  </aside>
</template>

<style module lang="scss">
.aside{
  background-color: var(--color-bg-secondary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: 280px;
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;

  .header{
    display: flex;
    justify-content: flex-end;
    padding: 16px 18px;
  }

  .switch{
    @include square(36px);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-primary);
    transition: background-color var(--transition-duration) ease;

    &:hover{
      box-shadow: inset 0 0 0 50px rgba(0, 0, 0, 0.04);
    }

    svg {
      transition: transform 0.3s ease;
      color: var(--color-icon-primary);

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  .list{
    display: flex;
    flex-direction: column;
    padding-block: 12px;

    .item{
      padding: 10px 12px 10px 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      color: var(--color-text-brand);
      border-left: 2px solid transparent;
      transition: padding 0.3s ease,
      background-color 0.2s ease,
      border-left-color 0.2s ease;

      &.is-active {
        border-left-color: var(--color-stroke-border-brand);
      }

      .icon{
        @include square(24px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: 8px;
        transition: width 0.3s ease,
        height 0.3s ease,
        padding 0.3s ease,
        background-color 0.3s ease;
      }

      .title{
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        white-space: nowrap;
        transition: opacity 0.3s ease;
      }
    }
  }

  &.collapsed {
    width: 68px;
    justify-content: center;

    .item {
      padding-block: 4px;

      .title {
        opacity: 0;
        pointer-events: none;
      }

      .icon{
        @include square(36px);
        padding: 8px;
        background-color: var(--color-bg-date-range);
      }
    }
  }
}
</style>