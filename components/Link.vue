<template>
  <component
    :is="isExternal ? 'a' : isButton ? 'button' : 'NuxtLink'"
    v-bind="{ [isExternal ? 'href' : 'to']: url }"
    class="link"
    :target="isExternal && '_blank'"
    :class="{ 'is-big': isBig, 'is-gray': isGray, 'is-white': isWhite, 'is-disabled': isDisabled }"
  >
    <span class="link-label" :label="label" :class="isBig ? 'text--t1' : 'text--t3'">
      {{ label }}
    </span>
    <i class="link-icon">
      <IconArrow />
    </i>
  </component>
</template>

<script>
import IconArrow from '@/assets/svg/arrow.svg'

export default {
  name: 'Link',
  components: {
    IconArrow
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    isBig: {
      type: Boolean,
      default: false
    },
    isExternal: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    isButton: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    isWhite: {
      type: Boolean,
      default: false
    },
    isGray: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDefault: var(--color-green);
$colorWhite: var(--color-white);
$colorGray: var(--color-dark-gray);

button.link {
  @include clear-btn();
}

.link {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  color: $colorDefault;

  &.is-white {
    color: $colorWhite;
  }

  &.is-gray {
    color: $colorGray;
  }

  &.is-big {
    .link-label {
      margin-right: 1.4rem;
    }
    .link-icon {
      margin-top: 4px;
      width: 3.2rem;
      height: 3.2rem;
    }
  }

  &[disabled] {
    pointer-events: none;
    cursor: default;
    color: $colorGray;
  }
}

.link-label {
  margin-right: .5rem;
  will-change: transform;
  transform: translateY(0);
  transition: transform .5s ease;

  &::before {
    content: attr(label);
    position: absolute;
    top: -1.5em;
    left: 0;
  }
}

.link-icon {
  margin-top: 2px;
  width: 1.6rem;
  height: 1.6rem;
}

.link {
  .is-hovering & {
    .link-label {
      transform: translateY(1.5em);
    }
  }
}

@include desktop {
  .link {
    &:hover {
      .link-label {
        transform: translateY(1.5em);
      }
    }
  }
}
</style>
