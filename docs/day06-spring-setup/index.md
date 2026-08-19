---
id: day06-spring-setup
title: "Ngày 6 – Tích hợp Spring Boot với Camunda 8"
sidebar_label: "Ngày 6 – Spring Boot Setup"
---

# Ngày 6 – Tích hợp Spring Boot với Camunda 8

> **Mục tiêu:** Tạo Spring Boot project kết nối được với Zeebe.

---

## Dependency

:::caution Chú ý artifact ID
Nhiều tutorial cũ dùng `camunda-bpm-spring-boot-starter` — đó là **Camunda 7**.  
Camunda 8 dùng artifact ID khác hoàn toàn.
:::

```xml title="pom.xml"
<properties>
    <java.version>21</java.version>
    <spring-boot.version>3.3.5</spring-boot.version>
    <camunda.version>8.9.0</camunda.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.camunda.spring</groupId>
            <artifactId>spring-boot-starter-camunda-sdk-bom</artifactId>
            <version>${camunda.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    
    <!-- Camunda 8 Spring Boot SDK -->
    <dependency>
        <groupId>io.camunda.spring</groupId>
        <artifactId>spring-boot-starter-camunda-sdk</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## application.yml

```yaml title="src/main/resources/application.yml"
camunda:
  client:
    zeebe:
      gateway-url: http://localhost:26500  # gRPC endpoint
      prefer-rest-over-grpc: false
    mode: simple  # Tắt auth cho local dev
```

---

## Main Application

```java title="src/main/java/com/example/CamundaApplication.java"
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CamundaApplication {
    public static void main(String[] args) {
        SpringApplication.run(CamundaApplication.class, args);
    }
}
```

---

## Kiểm tra kết nối

Chạy app và xem log:

```bash
mvn spring-boot:run
```

Nếu kết nối thành công bạn sẽ thấy:

```
INFO  io.camunda.zeebe.client - Zeebe client connected to gateway: localhost:26500
```

Nếu thấy `UNAVAILABLE: io exception` → Zeebe chưa chạy hoặc sai port.

---

## Tóm tắt ngày 6

- Dùng artifact `spring-boot-starter-camunda-sdk` (không phải `camunda-bpm-*`)
- Config `gateway-url` trỏ đến port gRPC `26500`
- `mode: simple` để bỏ qua auth khi dev local

---

**Ngày mai:** [Ngày 7 – Deploy process đầu tiên →](/day07-deploy-first-process)
