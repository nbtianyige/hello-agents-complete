// @ts-nocheck
<template>
  <div class="home-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <div class="icon-wrapper">
        <span class="icon">✈️</span>
      </div>
      <h1 class="page-title">智能旅行助手</h1>
      <p class="page-subtitle">基于 AI 的个性化旅行规划，让每一次出行都完美无忧</p>
    </div>

    <a-card class="form-card" :bordered="false">
      <a-form
        :model="formData"
        layout="vertical"
        @finish="handleSubmit"
      >
        <!-- 第一步：目的地和日期 -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-icon">📍</span>
            <span class="section-title">目的地与日期</span>
          </div>

          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item name="city" :rules="[{ required: true, message: '请输入目的地城市' }]">
                <template #label>
                  <span class="form-label">目的地城市</span>
                </template>
                <a-input
                  v-model:value="formData.city"
                  placeholder="例如：北京"
                  size="large"
                  class="custom-input"
                >
                  <template #prefix>
                    <span style="color: #1890ff;">🏙️</span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="start_date" :rules="[{ required: true, message: '请选择开始日期' }]">
                <template #label>
                  <span class="form-label">开始日期</span>
                </template>
                <a-date-picker
                  v-model:value="formData.start_date"
                  style="width: 100%"
                  size="large"
                  class="custom-input"
                  placeholder="选择日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="end_date" :rules="[{ required: true, message: '请选择结束日期' }]">
                <template #label>
                  <span class="form-label">结束日期</span>
                </template>
                <a-date-picker
                  v-model:value="formData.end_date"
                  style="width: 100%"
                  size="large"
                  class="custom-input"
                  placeholder="选择日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item>
                <template #label>
                  <span class="form-label">旅行天数</span>
                </template>
                <a-input
                  :value="daysCount"
                  disabled
                  size="large"
                  class="custom-input days-display"
                >
                  <template #addonAfter>
                    <span>天</span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <!-- 第二步：偏好设置 -->
        <div class="form-section">
          <div class="section-header">
            <span class="section-icon">⚙️</span>
            <span class="section-title">偏好设置</span>
          </div>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item name="transportation">
                <template #label>
                  <span class="form-label">交通偏好</span>
                </template>
                <a-select
                  v-model:value="formData.transportation"
                  placeholder="请选择"
                  size="large"
                  class="custom-select"
                >
                  <a-select-option value="公共交通">🚌 公共交通</a-select-option>
                  <a-select-option value="自驾">🚗 自驾</a-select-option>
                  <a-select-option value="步行">🚶 步行</a-select-option>
                  <a-select-option value="混合">🔄 混合模式</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="accommodation">
                <template #label>
                  <span class="form-label">住宿偏好</span>
                </template>
                <a-select
                  v-model:value="formData.accommodation"
                  placeholder="请选择"
                  size="large"
                  class="custom-select"
                >
                  <a-select-option value="经济型酒店">💰 经济型酒店</a-select-option>
                  <a-select-option value="舒适型酒店">⭐ 舒适型酒店</a-select-option>
                  <a-select-option value="高档酒店">💎 高档酒店</a-select-option>
                  <a-select-option value="民宿">🏠 民宿</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item name="preferences">
            <template #label>
              <span class="form-label">旅行兴趣</span>
            </template>
            <a-checkbox-group
              v-model:value="formData.preferences"
              :options="[
                { label: '自然风光', value: 'nature' },
                { label: '历史文化', value: 'history' },
                { label: '美食探索', value: 'food' },
                { label: '购物休闲', value: 'shopping' },
                { label: '拍照打卡', value: 'photo' }
              ]"
              class="checkbox-group"
            />
          </a-form-item>

          <a-form-item name="free_text_input">
            <template #label>
              <span class="form-label">其他需求（可选）</span>
            </template>
            <a-textarea
              v-model:value="formData.free_text_input"
              placeholder="例如：想去看樱花、适合亲子游等"
              :rows="3"
              class="custom-textarea"
            />
          </a-form-item>
        </div>

        <!-- 提交按钮 -->
        <div class="submit-section">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            size="large"
            class="submit-btn"
          >
            {{ loading ? 'AI 正在规划中...' : '✨ 生成旅行计划' }}
          </a-button>
        </div>
      </a-form>
    </a-card>

    <!-- 提示信息 -->
    <div class="tips-card">
      <a-alert
        message="温馨提示"
        description="AI 可能需要 30-60 秒来生成详细的旅行计划，请耐心等待。生成的计划包含景点推荐、路线规划、餐饮建议等完整信息。"
        type="info"
        show-icon
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { TripFormData as BaseType } from '@/types'
import { generateTripPlan } from '@/services/api'

const router = useRouter()

interface LocalTripFormData extends BaseType {
  start_date: Dayjs | null
  end_date: Dayjs | null
}

const loading = ref(false)
const loadingProgress = ref(0)
const loadingStatus = ref('')

const formData = reactive<LocalTripFormData>({
  city: '',
  start_date: null,
  end_date: null,
  travel_days: 1,
  transportation: '公共交通',
  accommodation: '经济型酒店',
  preferences: [],
  free_text_input: ''
})

const daysCount = computed(() => {
  if (formData.start_date && formData.end_date) {
    return formData.end_date.diff(formData.start_date, 'day') + 1
  }
  return 1
})

watch([() => formData.start_date, () => formData.end_date], ([start, end]) => {
  if (start && end) {
    const days = end.diff(start, 'day') + 1
    if (days > 0 && days <= 30) {
      formData.travel_days = days
    } else if (days > 30) {
      message.warning('旅行天数不能超过 30 天')
      formData.end_date = null
    } else {
      message.warning('结束日期不能早于开始日期')
      formData.end_date = null
    }
  }
})

const handleSubmit = async () => {
  if (!formData.city) {
    message.error('请输入目的地城市')
    return
  }
  
  if (!formData.start_date || !formData.end_date) {
    message.error('请选择日期')
    return
  }

  try {
    loading.value = true
    loadingProgress.value = 0
    
    const loadingInterval = setInterval(() => {
      if (loadingProgress.value < 90) {
        loadingProgress.value += 10
        const statuses = ['正在分析用户需求...', '正在搜索景点信息...', '正在规划最佳路线...', '正在推荐特色美食...']
        loadingStatus.value = statuses[Math.floor(loadingProgress.value / 30)]
      }
    }, 500)

    await generateTripPlan({
      city: formData.city,
      start_date: formData.start_date.format('YYYY-MM-DD'),
      end_date: formData.end_date.format('YYYY-MM-DD'),
      travel_days: formData.travel_days,
      transportation: formData.transportation,
      accommodation: formData.accommodation,
      preferences: formData.preferences,
      free_text_input: formData.free_text_input
    })

    clearInterval(loadingInterval)
    loadingProgress.value = 100
    loadingStatus.value = '规划完成!'

    await nextTick()
    
    setTimeout(() => {
      router.push('/result')
    }, 500)
  } catch (error: any) {
    console.error('生成旅行计划失败:', error)
    message.error(error.message || '生成旅行计划失败，请检查网络连接')
  } finally {
    loading.value = false
    setTimeout(() => {
      loadingProgress.value = 0
      loadingStatus.value = ''
    }, 1000)
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  position: relative;
}

.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
}

.page-header {
  text-align: center;
  padding: 60px 20px 40px;
  color: white;
}

.icon-wrapper {
  display: inline-block;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.icon {
  font-size: 40px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.form-card {
  max-width: 900px;
  margin: 0 auto 30px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.section-icon {
  font-size: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.custom-input,
.custom-select,
.custom-textarea {
  border-radius: 8px;
}

.days-display {
  background-color: #f0f9ff !important;
  font-weight: 600;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.submit-section {
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #f0f0f0;
}

.submit-btn {
  padding: 14px 60px;
  font-size: 16px;
  border-radius: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.tips-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 40px;
}
</style>
