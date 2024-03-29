<template>
  <div class="projects">
    <Section>
      <Container>
        <div class="grid projects-filters-grid">
          <div class="grid-col-title">
            <div class="title--h1">
              {{ $locale.projects.all }}
            </div>
          </div>
          <div class="grid-col-body" :class="{ 'is-select-open': selectStatus }">
            <client-only>
              <div class="projects-filters">
                <FormSelect
                  v-model="filterModel.year"
                  :options="filterOptionsYear"
                  :settings="{
                    placeholder: $locale.projects.allYears
                  }"
                  @open="changeSelectStatus(true)"
                  @close="changeSelectStatus(false)"
                />
                <FormSelect
                  v-model="filterModel.inProgress"
                  :options="filterOptionsProgress"
                  :settings="{
                    placeholder: $locale.projects.allStatuses
                  }"
                  @open="changeSelectStatus(true)"
                  @close="changeSelectStatus(false)"
                />
              </div>
            </client-only>
          </div>
        </div>
        <div v-if="isFilterSelected">
          <div v-for="group, key in groupedProjectByStatus" :key="key" class="grid projects-group">
            <div class="grid-col-title" data-aos="fade-up">
              <div class="title--h1 ">
                {{ $locale.projects.inProgress[key] ? $locale.projects.inProgress[key].label : '' }}
              </div>
            </div>
            <div class="grid-col-full">
              <ProjectsGrid :list="group" />
            </div>
          </div>
        </div>
        <div v-else>
          <ProjectsGrid :key="formKey" :list="filteredProjects" />
        </div>
      </Container>
    </Section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormSelect from '@/components/controls/FormSelect'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import { SELECT_DEFAULT_ID, PROJECTS_GROUP_KEY, groupByKey } from '@/config/constants'

export default {
  name: 'Projects',
  components: {
    FormSelect,
    ProjectsGrid
  },
  data () {
    return {
      selectStatus: false,
      formKey: 0,
      filterModel: {
        year: {},
        inProgress: {}
      }
    }
  },
  computed: {
    ...mapGetters({
      getProjects: 'getProjects'
    }),
    isFilterSelected () {
      return Object.values(this.filterModel).every(filterValue => filterValue.id === SELECT_DEFAULT_ID)
    },
    groupedProjectByStatus () {
      return groupByKey(this.getProjects, PROJECTS_GROUP_KEY)
    },
    filteredProjects () {
      return this.getProjects.filter((item) => {
        return Object.keys(this.filterModel).every((filterKey) => {
          return this.filterModel[filterKey].id === SELECT_DEFAULT_ID || item[filterKey] === this.filterModel[filterKey].id
        })
      })
    },
    filterOptionsProgress () {
      return Object.entries(this.$locale.projects.inProgress).map(([key, { id, label }]) => {
        return {
          id,
          label
        }
      })
    },
    filterOptionsYear () {
      const all = this.getProjects.map(item => item.year)
      return [...new Set(all)]
    }
  },
  watch: {
    filterModel: {
      deep: true,
      handler () {
        this.formKey++
      }
    }
  },
  methods: {
    changeSelectStatus (val) {
      this.selectStatus = !!val
    }
  }
}
</script>

<style lang="scss" scoped>
$colorGray: var(--color-gray);
$offsetTablet: $CONTAINER_SIDE_OFFSET_TABLET;
$offsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;

.projects {
  &::v-deep {
    > .section {
      overflow: hidden;
    }
  }
}

.projects-filters-grid {
  .grid-col-body {
    &.is-select-open {
      position: relative;
      z-index: 3;
      pointer-events: none;
    }
  }
}

.projects-filters {
  display: flex;
  align-items: flex-start;
  pointer-events: auto;
  margin-top: -1.5rem;

  > * {
    & + * {
      margin-left: 2.4rem;
    }
  }
}

.grid-col-title {
  grid-column: 1 / span 2;
}

.grid-col-body {
  grid-column: 3 / span 6;
}

@include mobile {
  .projects-filters-grid {
    padding: 0 $offsetMobile 4rem;
    margin: 0 0 - $offsetMobile;
    border-bottom: 1px solid $colorGray;
    .grid-col-title {
      grid-row: 1;
      grid-column: 1 / span 4;
    }
    .grid-col-body {
      grid-row: 2;
      grid-column: 1 / span 4;
    }
  }
  .projects-group {
    padding: 4rem $offsetMobile 4rem;
    margin: 0 0 - $offsetMobile;
    border-bottom: 1px solid $colorGray;

    & + .projects-group {
      padding-top: 4rem;
    }
  }
}

@include mobile_tablet {
  .projects-group {
    grid-row-gap: 2rem;
  }
  .projects {
    &::v-deep {
      > .section {
        padding-bottom: 0;
      }
    }
  }
}
@include tablet {
  .projects-filters-grid {
    display: flex;
    justify-content: space-between;
    padding: 0 $offsetTablet 8rem;
    margin: 0 0 - $offsetTablet;
    border-bottom: 1px solid $colorGray;
  }
  .projects-group {
    padding: 8rem $offsetTablet 8rem;
    margin: 0 0 - $offsetTablet;
    border-bottom: 1px solid $colorGray;

    & + .projects-group {
      padding-top: 8rem;
    }
  }
}

@include desktop {
  .projects {
    &::v-deep {
      & > .section {
        padding-bottom: 15rem;
      }
    }
  }
  .projects-filters-grid {
    margin-bottom: 42vh;
  }
  .projects-group {
    grid-row-gap: 4rem;

    & + .projects-group {
      margin-top: 15rem;
    }
  }
}
</style>
