<template>
  <div class="about">
    <div class="about-body" data-aos="fade-up" data-aos-delay="200">
      <vue-markdown v-if="body" :source="body" class="text--t1 indent" />
    </div>
    <div class="about-link" data-aos="fade-up" data-aos-delay="200">
      <Link :label="$locale.projects.all" :url="url" />
    </div>
    <div class="about-popup-hover">
      <PopupHover :img="alterImg" :body="alterBody" :type="popupHoverTypes.about" />
    </div>
  </div>
</template>

<script>
import { AppModelPopupHover } from '@/models'
import Link from '@/components/Link.vue'
import { RouteNames } from '@/config/constants'
import PopupHover from '@/components/PopupHover.vue'

export default {
  name: 'About',
  components: {
    Link,
    PopupHover
  },
  props: {
    alterImg: {
      type: Object,
      default () {
        return {}
      }
    },
    body: {
      type: String,
      default: ''
    },
    alterBody: {
      type: String,
      default: ''
    }
  },
  computed: {
    url () {
      return RouteNames.Projects
    },
    popupHoverTypes () {
      return AppModelPopupHover.types
    }
  }
}
</script>

<style lang="scss" scoped>

.about-popup-hover {
  display: flex;
  margin-top: 2rem;
}

.about-link {
  margin-top: 4rem;
}

@include desktop {
  .about {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: 60rem auto;
  }
  .about-popup-hover {
    margin: 0;
    grid-row: 1;
    grid-column: 2;
    justify-content: flex-end;
  }
  .about-body {
    grid-row: 1;
    grid-column: 1;
  }

  .about-link {
    grid-row: 2;
    grid-column: 1;
  }
}
</style>
