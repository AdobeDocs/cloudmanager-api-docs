---
title: Cloud Manager Model Definitions
description: Cloud Manager Model Definitions
--- 

import data from '../../../swagger-specs/api.yaml'

import ModelDefinitions from "../../components/model-definitions"

# API Model Definitions

## Programs

<ModelDefinitions data={data} sort={true} forTag="Programs" />

## Repositories

<ModelDefinitions data={data} sort={true} forTag="Repositories" />

## Branches

<ModelDefinitions data={data} sort={true} forTag="Branches" />

## Pipelines

<ModelDefinitions data={data} sort={true} forTag="Pipelines" />

## Pipeline Execution

<ModelDefinitions data={data} sort={true} forTag="Pipeline Execution" exclusions={['Redirect']}/>

## Environments

<ModelDefinitions data={data} sort={true} forTag="Environments" exclusions={['BadRequestError', 'Redirect']} />

## Variables

<ModelDefinitions data={data} sort={true} forTag="Variables" />

## IP Allowlist

<ModelDefinitions data={data} sort={true} forTag="IP Allowlist" />

## IP Allowlist Binding

<ModelDefinitions data={data} sort={true} forTag="IP Allowlist Binding" />

## Domain Names

<ModelDefinitions data={data} sort={true} forTag="Domain Names" />

## SSL Certificates

<ModelDefinitions data={data} sort={true} forTag="SSLCertificates" />

## Tenants

<ModelDefinitions data={data} sort={true} forTag="Tenants" />

## Regions

<ModelDefinitions data={data} sort={true} forTag="Regions" />

## Network Infrastructure

<ModelDefinitions data={data} sort={true} forTag="Network infrastructure" />

## Environment Advanced Networking Configuration

<ModelDefinitions data={data} sort={true} forTag="Environment Advanced Networking Configuration" exclusions={['Environment']}/>
