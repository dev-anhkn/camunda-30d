---
id: day01-architecture
title: "Ngày 1 – Camunda 8 Architecture"
sidebar_label: "Ngày 1 – Architecture"
---

# Ngày 1 – Camunda 8 Architecture

> **Mục tiêu:** Hiểu tổng quan kiến trúc Camunda 8, các component chính và sự khác biệt so với Camunda 7.

---

## Camunda 7 vs Camunda 8

Đây là điều đầu tiên cần nắm rõ vì tài liệu cũ trên internet hầu hết vẫn là C7:

| Điểm khác biệt | Camunda 7 | Camunda 8 |
|---|---|---|
| Process engine | Internal (embedded/standalone) | **Zeebe** (distributed) |
| Database | MySQL, PostgreSQL, Oracle... | **Elasticsearch** (event log) |
| Java API | `ProcessEngine`, `RuntimeService`... | **Job Worker** (event-driven) |
| Deploy model | WAR, embedded JAR | **gRPC** to Zeebe broker |
| External Task | REST polling | **Job Worker** (push-based) |

:::caution
Nếu bạn đang học từ tài liệu Camunda trước 2022, **rất có thể là C7** — API khác hoàn toàn.
:::

---

## Các component trong Self-managed

Khi chạy Camunda 8 Self-managed, bạn sẽ có các service sau:

```
┌─────────────────────────────────────────────────┐
│                   CAMUNDA 8                      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Zeebe   │  │ Operate  │  │   Tasklist   │  │
│  │ (engine) │  │(monitor) │  │  (human task)│  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │               │            │
│  ┌────▼──────────────▼───────────────▼────────┐  │
│  │           Elasticsearch                     │  │
│  └─────────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────┐  ┌──────────┐                     │
│  │ Identity │  │Connectors│                     │
│  │  (auth)  │  │          │                     │
│  └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────┘
```

### Zeebe
- **Process engine** chính — nhận, thực thi, lưu trạng thái process
- Dùng **gRPC** để giao tiếp với client (Spring Boot của bạn)
- Chạy theo kiến trúc **distributed** — có thể scale horizontal

### Operate
- UI để **monitor** process đang chạy
- Xem biến, trace lỗi, resolve incident
- Đọc dữ liệu từ Elasticsearch

### Tasklist
- UI cho **User Task** — người dùng claim và complete task
- Thường dùng khi có workflow cần human approval

### Identity
- Quản lý **authentication/authorization**
- Tích hợp với Keycloak

### Elasticsearch
- Không phải database theo nghĩa truyền thống
- Lưu **event log** của tất cả process instance
- Operate và Tasklist đọc từ đây

---

## Token flow — khái niệm cốt lõi

Trong BPMN, mỗi process instance có một **token** di chuyển qua các element:

```
Start Event → Task A → Gateway → Task B → End Event
    ●  ──────────────────────────────────────────▶
```

- Token đến đâu → element đó **active**
- Job Worker của bạn nhận job khi token đến **Service Task**
- Token tiếp tục khi job được **complete**

---

## Tóm tắt ngày 1

- Camunda 8 dùng **Zeebe** engine, khác hoàn toàn C7
- Self-managed gồm: Zeebe + Operate + Tasklist + Elasticsearch + Identity
- Giao tiếp qua **gRPC**, không phải REST như C7
- **Token** là đơn vị thực thi trong BPMN

---

**Ngày mai:** [Ngày 2 – Setup Docker Compose →](/day04-docker-setup)
