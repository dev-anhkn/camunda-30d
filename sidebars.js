const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🏗️ Phần 1 – Setup & Architecture (Ngày 1–7)',
      items: ['day01-architecture','day04-docker-setup','day06-spring-setup','day07-deploy-first-process'],
    },
    {
      type: 'category',
      label: '📦 Phần 2 – BPMN Cơ Bản (Ngày 8–11)',
      items: ['day08-service-task','day09-user-task','day10-gateway','day11-sequence-flow'],
    },
    {
      type: 'category',
      label: '⚙️ Phần 3 – Job Workers (Ngày 12–15)',
      items: ['day12-job-worker-intro','day13-job-worker-variables','day14-job-worker-error','day15-job-worker-retry'],
    },
    {
      type: 'category',
      label: '🔔 Phần 4 – Events (Ngày 16–19)',
      items: ['day16-timer-event','day17-message-event','day18-signal-event','day19-error-boundary'],
    },
    {
      type: 'category',
      label: '🔀 Phần 5 – Sub-process & Multi-instance (Ngày 20–22)',
      items: ['day20-subprocess','day21-call-activity','day22-multi-instance'],
    },
    {
      type: 'category',
      label: '📊 Phần 6 – DMN & FEEL (Ngày 23–24)',
      items: ['day23-dmn-intro','day24-feel-expression'],
    },
    {
      type: 'category',
      label: '🔍 Phần 7 – Operate & Monitoring (Ngày 25–26)',
      items: ['day25-operate-monitor','day26-operate-incident'],
    },
    {
      type: 'category',
      label: '🧪 Phần 8 – Testing (Ngày 27–28)',
      items: ['day27-testing-intro','day28-testing-advanced'],
    },
    {
      type: 'category',
      label: '🔐 Phần 9 – Identity & Production (Ngày 29–30)',
      items: ['day29-identity-auth','day30-production'],
    },
  ],
};

module.exports = sidebars;