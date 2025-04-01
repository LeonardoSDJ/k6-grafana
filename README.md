# K6 Performance Testing Framework

[English](#english) | [Português](#português)

---

## English

A fully containerized performance testing framework using K6, InfluxDB, and Grafana for executing and visualizing test results.

### Overview

This project is designed for study purposes, providing a structured environment for performance testing with:

- **K6**: A modern load testing tool for APIs and web applications.
- **InfluxDB**: A time-series database for storing performance metrics.
- **Grafana**: A powerful visualization tool for analyzing test results.

### Project Structure

```
.
├── docker-compose.yml    # Docker Compose configuration
├── grafana/              # Grafana setup
│   ├── dashboards/       # Pre-configured dashboards
│   └── provisioning/     # Datasource and dashboard provisioning
├── influxdb/             # InfluxDB configuration
│   └── influxdb.conf     # InfluxDB configuration file
└── k6/                   # K6 test scripts and configuration
    ├── Dockerfile        # K6 Docker image
    ├── scripts/          # Test scripts
    ├── config/           # Test configurations
    ├── lib/              # Shared utilities
    ├── scenarios/        # Test scenarios
```

### 🛠 Prerequisites

Ensure you have the following installed:

- **Docker**
- **Docker Compose**

### Running the Test Environment

1. Start the environment:
   ```bash
   docker-compose up -d
   ```

2. Access Grafana at [http://localhost:3000](http://localhost:3000)

3. Run a test:
   ```bash
   docker-compose run k6 run /scripts/smoke_test.js
   ```

### Viewing Results

Test results are automatically sent to InfluxDB and can be analyzed in Grafana.

1. Open Grafana at [http://localhost:3000](http://localhost:3000)
2. Navigate to the **K6 Performance Testing** dashboard

---

## Português

Um framework totalmente conteinerizado para testes de performance usando K6, InfluxDB e Grafana para execução e visualização de resultados.

### Visão Geral

Este projeto foi desenvolvido para fins de estudo, fornecendo um ambiente estruturado para testes de desempenho com:

- **K6**: Uma ferramenta moderna de testes de carga para APIs e aplicações web.
- **InfluxDB**: Um banco de dados de séries temporais para armazenar métricas de desempenho.
- **Grafana**: Uma poderosa ferramenta de visualização para análise de resultados de teste.

### Estrutura do Projeto

```
.
├── docker-compose.yml    # Configuração do Docker Compose
├── grafana/              # Configuração do Grafana
│   ├── dashboards/       # Dashboards predefinidos
│   └── provisioning/     # Provisionamento de fontes de dados e dashboards
├── influxdb/             # Configuração do InfluxDB
│   └── influxdb.conf     # Arquivo de configuração do InfluxDB
└── k6/                   # Scripts e configurações de teste do K6
    ├── Dockerfile        # Imagem Docker do K6
    ├── scripts/          # Scripts de teste
    ├── config/           # Configurações de teste
    ├── lib/              # Utilitários compartilhados
    ├── scenarios/        # Cenários de teste
```

### 🛠 Requisitos

Certifique-se de ter os seguintes itens instalados:

- **Docker**
- **Docker Compose**

### Executando o Ambiente de Teste

1. Iniciar o ambiente:
   ```bash
   docker-compose up -d
   ```

2. Acesse o Grafana em [http://localhost:3000](http://localhost:3000)

3. Execute um teste:
   ```bash
   docker-compose run k6 run /scripts/smoke_test.js
   ```

### Visualizando Resultados

Os resultados dos testes são automaticamente enviados ao InfluxDB e podem ser analisados no Grafana.

1. Abra o Grafana em [http://localhost:3000](http://localhost:3000)
2. Navegue até o dashboard **K6 Performance Testing**

---

## License / Licença

This project is licensed under the **MIT License**. / Este projeto está licenciado sob a **Licença MIT**.

