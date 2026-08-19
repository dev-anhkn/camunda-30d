/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🏗️ Phần 1 – Setup & Architecture (Ngày 1–7)',
      items: [
        'day01-architecture/index',
        'day04-docker-setup/index',
        'day06-spring-setup/index',
        'day07-deploy-first-process/index',
      ],
    },
    {
      type: 'category',
      label: '📦 Phần 2 – BPMN Cơ Bản (Ngày 8–11)',
      items: [
        'day08-service-task/index',
        'day09-user-task/index',
        'day10-gateway/index',
        'day11-sequence-flow/index',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Phần 3 – Job Workers (Ngày 12–15)',
      items: [
        'day12-job-worker-intro/index',
        'day13-job-worker-variables/index',
        'day14-job-worker-error/index',
        'day15-job-worker-retry/index',
      ],
    },
    {
      type: 'category',
      label: '🔔 Phần 4 – Events (Ngày 16–19)',
      items: [
        'day16-timer-event/index',
        'day17-message-event/index',
        'day18-signal-event/index',
        'day19-error-boundary/index',
      ],
    },
    {
      type: 'category',
      label: '🔀 Phần 5 – Sub-process & Multi-instance (Ngày 20–22)',
      items: [
        'day20-subprocess/index',
        'day21-call-activity/index',
        'day22-multi-instance/index',
      ],
    },
    {
      type: 'category',
      label: '📊 Phần 6 – DMN & FEEL (Ngày 23–24)',
      items: [
        'day23-dmn-intro/index',
        'day24-feel-expression/index',
      ],
    },
    {
      type: 'category',
      label: '🔍 Phần 7 – Operate & Monitoring (Ngày 25–26)',
      items: [
        'day25-operate-monitor/index',
        'day26-operate-incident/index',
      ],
    },
    {
      type: 'category',
      label: '🧪 Phần 8 – Testing (Ngày 27–28)',
      items: [
        'day27-testing-intro/index',
        'day28-testing-advanced/index',
      ],
    },
    {
      type: 'category',
      label: '🔐 Phần 9 – Identity & Production (Ngày 29–30)',
      items: [
        'day29-identity-auth/index',
        'day30-production/index',
      ],
    },
  ],
};

module.exports = sidebars;
