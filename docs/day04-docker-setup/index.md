---
id: day04-docker-setup
title: "Ngày 4 – Setup Self-managed với Docker Compose"
sidebar_label: "Ngày 4 – Docker Compose Setup"
---

# Ngày 4 – Setup Self-managed với Docker Compose

> **Mục tiêu:** Chạy được Camunda 8 Self-managed trên máy local trong 15 phút.

---

## Yêu cầu

- Docker Desktop >= 4.x
- RAM tối thiểu **8GB** dành cho Docker (Elasticsearch ngốn nhiều)
- Docker Compose V2 (`docker compose` không phải `docker-compose`)

---

## docker-compose.yml

Camunda cung cấp file compose chính thức. Tạo file `docker-compose.yml`:

```yaml
version: "3.8"

services:

  zeebe:
    image: camunda/zeebe:8.9.0
    container_name: zeebe
    ports:
      - "26500:26500"   # gRPC (Spring Boot kết nối vào đây)
      - "9600:9600"     # Management
      - "8080:8080"     # REST API
    environment:
      - ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_CLASSNAME=io.camunda.zeebe.exporter.ElasticsearchExporter
      - ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_URL=http://elasticsearch:9200
      - ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_BULK_SIZE=1
    depends_on:
      - elasticsearch
    networks:
      - camunda-platform

  operate:
    image: camunda/operate:8.9.0
    container_name: operate
    ports:
      - "8081:8080"
    environment:
      - CAMUNDA_OPERATE_ZEEBE_GATEWAYADDRESS=zeebe:26500
      - CAMUNDA_OPERATE_ELASTICSEARCH_URL=http://elasticsearch:9200
      - CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      - zeebe
      - elasticsearch
    networks:
      - camunda-platform

  tasklist:
    image: camunda/tasklist:8.9.0
    container_name: tasklist
    ports:
      - "8082:8080"
    environment:
      - CAMUNDA_TASKLIST_ZEEBE_GATEWAYADDRESS=zeebe:26500
      - CAMUNDA_TASKLIST_ELASTICSEARCH_URL=http://elasticsearch:9200
      - CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      - zeebe
      - elasticsearch
    networks:
      - camunda-platform

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    container_name: elasticsearch
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
    networks:
      - camunda-platform

networks:
  camunda-platform:
    driver: bridge
```

---

## Khởi động

```bash
docker compose up -d
```

Chờ khoảng **60–90 giây** để Elasticsearch khởi động xong, sau đó kiểm tra:

```bash
# Zeebe health
curl http://localhost:9600/actuator/health

# Operate UI
open http://localhost:8081

# Tasklist UI
open http://localhost:8082
```

---

## Kiểm tra Zeebe đã sẵn sàng

```bash
docker logs zeebe | grep "Broker is ready"
```

Thấy dòng `Broker is ready` là xong.

---

## Lỗi hay gặp

**Out of memory:** Tăng RAM cho Docker lên 8GB+ trong Docker Desktop > Settings > Resources.

**Elasticsearch không start:** Check log `docker logs elasticsearch` — thường do `vm.max_map_count` thấp:
```bash
# Linux/Mac
sudo sysctl -w vm.max_map_count=262144
```

**Port bị conflict:** Đổi port ngoài (bên trái dấu `:`) nếu 8081/8082 đang bận.

---

## Tóm tắt ngày 4

- Operate chạy tại `http://localhost:8081`
- Tasklist chạy tại `http://localhost:8082`
- Zeebe gRPC port: `26500` — Spring Boot sẽ kết nối vào đây
- Elasticsearch: `http://localhost:9200`

---

**Ngày mai:** [Ngày 6 – Tích hợp Spring Boot →](/day06-spring-setup)
